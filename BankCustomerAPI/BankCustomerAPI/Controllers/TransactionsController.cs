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
    [Route("api/transactions")]
    [Authorize(Roles = "User")]
    public class TransactionsController : ControllerBase
    {
        private readonly TrainingDbContext _db;

        public TransactionsController(TrainingDbContext db)
        {
            _db = db;
        }

        // Helper: get logged in userId from JWT
        private async Task<int> GetUserIdAsync()
        {
            var email = User.FindFirstValue(ClaimTypes.Name);
            if (string.IsNullOrEmpty(email))
                return 0;

            return await _db.Users
                .Where(u => u.Email == email)
                .Select(u => u.UserId)
                .FirstOrDefaultAsync();
        }

        // GET: api/transactions/my
        [HttpGet("my")]
        public async Task<IActionResult> GetMyTransactions()
        {
            var userId = await GetUserIdAsync();
            if (userId == 0)
                return Unauthorized("Invalid user from token");

            var list = await _db.Transactions
                .Where(t => t.PerformedBy == userId)
                .Include(t => t.Account)
                .OrderByDescending(t => t.TransDate)
                .ToListAsync();

            return Ok(list);
        }

        // POST: api/transactions/deposit
        [HttpPost("deposit")]
        public async Task<IActionResult> Deposit([FromBody] TransactionRequest req)
        {
            if (req.Amount <= 0)
                return BadRequest("Amount must be greater than 0");

            var userId = await GetUserIdAsync();
            if (userId == 0)
                return Unauthorized("Invalid user");

            var acc = await _db.Accounts
                .FirstOrDefaultAsync(a => a.AccountId == req.AccountId && a.UserId == userId);

            if (acc == null)
                return Unauthorized("You do not own this account");

            acc.Balance += req.Amount;
            acc.UpdatedAt = DateTime.Now;

            var tx = new Transaction
            {
                AccountId = req.AccountId,
                Amount = req.Amount,
                TransactionType = "deposit",
                PerformedBy = userId,
                TransDate = DateTime.Now,
                CreatedAt = DateTime.Now,
                Remarks = req.Remarks
            };

            _db.Transactions.Add(tx);
            await _db.SaveChangesAsync();

            return Ok(new { success = true, balance = acc.Balance, txId = tx.TransactionId });
        }

        // POST: api/transactions/withdraw
        [HttpPost("withdraw")]
        public async Task<IActionResult> Withdraw([FromBody] TransactionRequest req)
        {
            if (req.Amount <= 0)
                return BadRequest("Amount must be greater than 0");

            var userId = await GetUserIdAsync();
            if (userId == 0)
                return Unauthorized("Invalid user");

            var acc = await _db.Accounts
                .FirstOrDefaultAsync(a => a.AccountId == req.AccountId && a.UserId == userId);

            if (acc == null)
                return Unauthorized("You do not own this account");

            if (acc.Balance < req.Amount)
                return BadRequest("Insufficient balance");

            acc.Balance -= req.Amount;
            acc.UpdatedAt = DateTime.Now;

            var tx = new Transaction
            {
                AccountId = req.AccountId,
                Amount = req.Amount,
                TransactionType = "withdraw",
                PerformedBy = userId,
                TransDate = DateTime.Now,
                CreatedAt = DateTime.Now,
                Remarks = req.Remarks
            };

            _db.Transactions.Add(tx);
            await _db.SaveChangesAsync();

            return Ok(new { success = true, balance = acc.Balance, txId = tx.TransactionId });
        }
    }
}
