using BankCustomerAPI.Data;
using BankCustomerAPI.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace BankCustomerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "User")] // only customers (users) can use these endpoints
    public class AccountsController : ControllerBase
    {
        private readonly TrainingDbContext _db;
        private readonly ILogger<AccountsController> _logger;

        public AccountsController(TrainingDbContext db, ILogger<AccountsController> logger)
        {
            _db = db;
            _logger = logger;
        }

        // Helper: get userId from token (supports "userId" or NameIdentifier)
        private int? GetCurrentUserId()
        {
            var uidClaim = User.Claims.FirstOrDefault(c => c.Type == "userId") ??
                           User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier) ??
                           User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name); // fallback
            if (uidClaim == null) return null;

            if (int.TryParse(uidClaim.Value, out var id)) return id;
            return null;
        }

        // -----------------------------
        // GET: api/accounts/my
        // -----------------------------
        [HttpGet("my")]
        public async Task<IActionResult> GetMyAccounts()
        {
            var userId = GetCurrentUserId();
            if (userId == null) return Unauthorized(new { message = "Invalid token" });

            var accounts = await _db.Accounts
                .Where(a => a.UserId == userId && a.Status == "active")
                .Include(a => a.Branch)
                    .ThenInclude(b => b!.Bank)
                .ToListAsync();

            return Ok(new { success = true, accounts });
        }

        // -----------------------------
        // DEPOSIT
        // POST: api/accounts/deposit
        // -----------------------------
        [HttpPost("deposit")]
        public async Task<IActionResult> Deposit([FromBody] DepositRequest req)
        {
            if (req == null || req.Amount <= 0) return BadRequest(new { message = "Invalid deposit request" });

            var userId = GetCurrentUserId();
            if (userId == null) return Unauthorized(new { message = "Invalid token" });

            var acc = await _db.Accounts.FindAsync(req.AccountId);
            if (acc == null) return NotFound(new { message = "Account not found" });

            // ensure user owns the account
            if (acc.UserId != userId)
                return Forbid();

            acc.Balance += req.Amount;
            acc.LastTransactionDate = DateTime.Now;
            acc.UpdatedAt = DateTime.Now;

            var tx = new Transaction
            {
                AccountId = acc.AccountId,
                Amount = req.Amount,
                TransactionType = "deposit",
                PerformedBy = userId,
                TransDate = DateTime.Now,
                Remarks = req.Remarks ?? "deposit",
                CreatedAt = DateTime.Now
            };

            _db.Transactions.Add(tx);
            await _db.SaveChangesAsync();

            return Ok(new { success = true, message = "Deposit successful", newBalance = acc.Balance, transaction = tx });
        }

        // -----------------------------
        // WITHDRAW
        // POST: api/accounts/withdraw
        // -----------------------------
        [HttpPost("withdraw")]
        public async Task<IActionResult> Withdraw([FromBody] WithdrawRequest req)
        {
            if (req == null || req.Amount <= 0) return BadRequest(new { message = "Invalid withdraw request" });

            var userId = GetCurrentUserId();
            if (userId == null) return Unauthorized(new { message = "Invalid token" });

            var acc = await _db.Accounts.FindAsync(req.AccountId);
            if (acc == null) return NotFound(new { message = "Account not found" });

            // ensure user owns the account
            if (acc.UserId != userId)
                return Forbid();

            if (acc.Balance < req.Amount)
                return BadRequest(new { message = "Insufficient balance" });

            acc.Balance -= req.Amount;
            acc.LastTransactionDate = DateTime.Now;
            acc.UpdatedAt = DateTime.Now;

            var tx = new Transaction
            {
                AccountId = acc.AccountId,
                Amount = req.Amount,
                TransactionType = "withdraw",
                PerformedBy = userId,
                TransDate = DateTime.Now,
                Remarks = req.Remarks ?? "withdraw",
                CreatedAt = DateTime.Now
            };

            _db.Transactions.Add(tx);
            await _db.SaveChangesAsync();

            return Ok(new { success = true, message = "Withdrawal successful", newBalance = acc.Balance, transaction = tx });
        }

        // -----------------------------
        // TRANSFER
        // POST: api/accounts/transfer
        // -----------------------------
        [HttpPost("transfer")]
        public async Task<IActionResult> Transfer([FromBody] TransferRequest req)
        {
            if (req == null || req.Amount <= 0) return BadRequest(new { message = "Invalid transfer request" });

            var userId = GetCurrentUserId();
            if (userId == null) return Unauthorized(new { message = "Invalid token" });

            var from = await _db.Accounts.FindAsync(req.FromAccountId);
            var to = await _db.Accounts.FindAsync(req.ToAccountId);

            if (from == null || to == null)
                return NotFound(new { message = "One or both accounts not found" });

            // ensure the 'from' account belongs to the current user
            if (from.UserId != userId)
                return Forbid();

            if (from.Balance < req.Amount)
                return BadRequest(new { message = "Insufficient balance" });

            // Use DB transaction to ensure atomicity
            using (var dbTx = await _db.Database.BeginTransactionAsync())
            {
                try
                {
                    from.Balance -= req.Amount;
                    from.LastTransactionDate = DateTime.Now;
                    from.UpdatedAt = DateTime.Now;

                    to.Balance += req.Amount;
                    to.LastTransactionDate = DateTime.Now;
                    to.UpdatedAt = DateTime.Now;

                    var txOut = new Transaction
                    {
                        AccountId = from.AccountId,
                        Amount = req.Amount,
                        TransactionType = "transfer-out",
                        PerformedBy = userId,
                        TransDate = DateTime.Now,
                        Remarks = req.Remarks ?? "transfer-out",
                        CreatedAt = DateTime.Now
                    };

                    var txIn = new Transaction
                    {
                        AccountId = to.AccountId,
                        Amount = req.Amount,
                        TransactionType = "transfer-in",
                        PerformedBy = userId,
                        TransDate = DateTime.Now,
                        Remarks = req.Remarks ?? "transfer-in",
                        CreatedAt = DateTime.Now
                    };

                    _db.Transactions.AddRange(txOut, txIn);
                    await _db.SaveChangesAsync();

                    await dbTx.CommitAsync();

                    return Ok(new { success = true, message = "Transfer successful", fromBalance = from.Balance, toBalance = to.Balance });
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Transfer failed");
                    await dbTx.RollbackAsync();
                    return StatusCode(500, new { message = "Transfer failed" });
                }
            }
        }

        // -----------------------------
        // CLOSE ACCOUNT
        // POST: api/accounts/close/5
        // -----------------------------
        [HttpPost("close/{id}")]
        public async Task<IActionResult> CloseAccount(int id)
        {
            var userId = GetCurrentUserId();
            if (userId == null) return Unauthorized(new { message = "Invalid token" });

            var acc = await _db.Accounts.FindAsync(id);
            if (acc == null) return NotFound(new { message = "Account not found" });

            if (acc.UserId != userId)
                return Forbid();

            acc.Status = "closed";
            acc.ClosedDate = DateTime.Now;
            acc.UpdatedAt = DateTime.Now;

            await _db.SaveChangesAsync();

            return Ok(new { success = true, message = "Account closed successfully" });
        }
    }

    // DTOs -> same as yours, kept here for completeness
    public class DepositRequest
    {
        public int AccountId { get; set; }
        public decimal Amount { get; set; }
        public string? Remarks { get; set; }
    }

    public class WithdrawRequest
    {
        public int AccountId { get; set; }
        public decimal Amount { get; set; }
        public string? Remarks { get; set; }
    }

    public class TransferRequest
    {
        public int FromAccountId { get; set; }
        public int ToAccountId { get; set; }
        public decimal Amount { get; set; }
        public string? Remarks { get; set; }
    }
}
