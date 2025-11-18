using BankCustomerAPI.Data;
using BankCustomerAPI.Entities;
using BankCustomerAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace BankCustomerAPI.Controllers
{
    [ApiController]
    [Route("api/customer")]
    [Authorize(Roles = "User")]
    public class CustomerController : ControllerBase
    {
        private readonly TrainingDbContext _context;
        private readonly ILogger<CustomerController> _logger;

        public CustomerController(TrainingDbContext context, ILogger<CustomerController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // ==========================================================
        // GET /api/customer/accounts
        // ==========================================================
        [HttpGet("accounts")]
        public async Task<IActionResult> GetAccounts()
        {
            var email = User.FindFirstValue(ClaimTypes.Name);
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == email);

            if (user == null)
                return Unauthorized();

            var accounts = await _context.Accounts
                .Where(a => a.UserId == user.UserId)
                .Include(a => a.Branch).ThenInclude(b => b!.Bank)
                .Select(a => new
                {
                    a.AccountId,
                    a.AccountNumber,
                    a.AccountType,
                    a.Balance,
                    a.Status,
                    a.CreatedDate,
                    Branch = new
                    {
                        a.Branch!.BranchId,
                        a.Branch.BranchName,
                        Bank = new
                        {
                            a.Branch!.Bank!.BankId,
                            a.Branch!.Bank!.BankName
                        }
                    }
                })
                .ToListAsync();

            return Ok(accounts);
        }

        // ==========================================================
        // POST /api/customer/accounts/create
        // ==========================================================
        [HttpPost("accounts/create")]
        public async Task<IActionResult> CreateAccount([FromBody] CreateAccountDto dto)
        {
            if (dto == null)
                return BadRequest("Invalid request");

            var email = User.FindFirstValue(ClaimTypes.Name);
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == email);

            if (user == null) return Unauthorized();

            var branch = await _context.Branches.FindAsync(dto.BranchId);
            if (branch == null)
                return BadRequest("Invalid branch id");

            var account = new Account
            {
                AccountNumber = "AC" + Guid.NewGuid().ToString("N").Substring(0, 10),
                AccountType = dto.AccountType,
                Balance = dto.InitialDeposit,
                Currency = "INR",
                BranchId = dto.BranchId,
                UserId = user.UserId,
                Status = "active",
                CreatedAt = DateTime.Now,
                CreatedDate = DateTime.Now
            };

            _context.Accounts.Add(account);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                account.AccountId,
                account.AccountNumber,
                account.AccountType,
                account.Balance,
                account.Status,
                account.CreatedDate
            });
        }

        // ==========================================================
        // POST /api/customer/accounts/close/{id}
        // ==========================================================
        [HttpPost("accounts/close/{id}")]
        public async Task<IActionResult> CloseAccount(int id)
        {
            var email = User.FindFirstValue(ClaimTypes.Name);
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == email);

            if (user == null)
                return Unauthorized();

            var acc = await _context.Accounts.FirstOrDefaultAsync(a => a.AccountId == id && a.UserId == user.UserId);

            if (acc == null)
                return NotFound("Account not found");

            acc.Status = "closed";
            acc.ClosedDate = DateTime.Now;

            await _context.SaveChangesAsync();

            return Ok(new { id = acc.AccountId, status = "closed" });
        }

        // ==========================================================
        // GET /api/customer/transactions
        // ==========================================================
        [HttpGet("transactions")]
        public async Task<IActionResult> GetTransactions()
        {
            var email = User.FindFirstValue(ClaimTypes.Name);
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == email);

            if (user == null)
                return Unauthorized();

            var list = await _context.Transactions
                .Where(t => t.PerformedBy == user.UserId)
                .OrderByDescending(t => t.TransDate)
                .Select(t => new
                {
                    t.TransactionId,
                    t.TransactionType,
                    t.Amount,
                    t.TransDate,
                    Account = new
                    {
                        t.Account!.AccountId,
                        t.Account!.AccountNumber
                    }
                })
                .ToListAsync();

            return Ok(list);
        }

        // ==========================================================
        // POST /api/customer/transaction
        // ==========================================================
        [HttpPost("transaction")]
        public async Task<IActionResult> CreateTransaction([FromBody] TransactionRequest request)
        {
            _logger.LogInformation("🔥 Received Transaction DTO: {@req}", request);

            if (request == null)
                return BadRequest("Request body missing");

            if (request.AccountId <= 0)
                return BadRequest("Invalid AccountId");

            if (request.Amount <= 0)
                return BadRequest("Amount must be greater than 0");

            if (string.IsNullOrWhiteSpace(request.TransactionType))
                return BadRequest("TransactionType required");

            string type = request.TransactionType.Trim().ToLower();

            if (type != "deposit" && type != "withdraw")
                return BadRequest("TransactionType must be 'deposit' or 'withdraw'");

            var email = User.FindFirstValue(ClaimTypes.Name);
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == email);
            if (user == null)
                return Unauthorized();

            var account = await _context.Accounts
                .FirstOrDefaultAsync(a => a.AccountId == request.AccountId && a.UserId == user.UserId);

            if (account == null)
                return NotFound("Account not found");

            // ——— PROCESS ————
            if (type == "withdraw")
            {
                if (account.Balance < request.Amount)
                    return BadRequest("Insufficient balance");

                account.Balance -= request.Amount;
            }
            else
            {
                account.Balance += request.Amount;
            }

            var tx = new Transaction
            {
                AccountId = request.AccountId,
                Amount = request.Amount,
                TransactionType = type,
                Remarks = request.Remarks,
                TransDate = DateTime.Now,
                CreatedAt = DateTime.Now,
                PerformedBy = user.UserId
            };

            _context.Transactions.Add(tx);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                newBalance = account.Balance,
                transactionId = tx.TransactionId
            });
        }
    }
}
