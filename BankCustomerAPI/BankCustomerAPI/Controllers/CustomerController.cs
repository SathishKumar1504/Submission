using BankCustomerAPI.Data;
using BankCustomerAPI.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace BankCustomerAPI.Controllers
{
    [ApiController]
    [Route("api/customer")]
    [Authorize(Roles = "Customer")]
    public class CustomerController : ControllerBase
    {
        private readonly TrainingDbContext _context;
        private readonly ILogger<CustomerController> _logger;

        public CustomerController(TrainingDbContext context, ILogger<CustomerController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // =====================================================
        // GET: /api/customer/profile
        // =====================================================
        [HttpGet("profile")]
        public async Task<IActionResult> GetProfile()
        {
            var email = User.FindFirstValue(ClaimTypes.Name);
            if (string.IsNullOrEmpty(email))
                return Unauthorized("Invalid token.");

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (user == null)
                return NotFound("Profile not found");

            return Ok(new
            {
                user.Username,
                user.Email,
                user.Phone,
                user.Status,
                user.DateOfBirth
            });
        }

        // =====================================================
        // GET: /api/customer/accounts
        // =====================================================
        [HttpGet("accounts")]
        public async Task<IActionResult> GetAccounts()
        {
            var email = User.FindFirstValue(ClaimTypes.Name);
            if (string.IsNullOrEmpty(email))
                return Unauthorized("Invalid token.");

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (user == null)
                return NotFound("User not found.");

            var accounts = await _context.Accounts
                .Where(a => a.UserId == user.UserId)
                .Include(a => a.Branch)
                .ThenInclude(b => b.Bank)

                .ToListAsync();

            return Ok(accounts);
        }

        // =====================================================
        // POST: /api/customer/transaction
        // =====================================================
        [HttpPost("transaction")]
        public async Task<IActionResult> CreateTransaction([FromBody] Transaction transaction)
        {
            if (transaction == null || transaction.Amount <= 0)
                return BadRequest("Invalid transaction data.");

            var email = User.FindFirstValue(ClaimTypes.Name);
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (user == null)
                return Unauthorized("Invalid user.");

            var account = await _context.Accounts.FindAsync(transaction.AccountId);
            if (account == null)
                return NotFound("Account not found.");

            // ✅ Assign the performing user
            transaction.PerformedBy = user.UserId;
            transaction.TransDate = DateTime.Now;
            transaction.CreatedAt = DateTime.Now;

            // ✅ Business rule (example)
            if (transaction.TransactionType.ToLower() == "withdraw" && account.Balance < transaction.Amount)
                return BadRequest("Insufficient balance.");

            // ✅ Adjust balance
            if (transaction.TransactionType.ToLower() == "deposit")
                account.Balance += transaction.Amount;
            else if (transaction.TransactionType.ToLower() == "withdraw")
                account.Balance -= transaction.Amount;

            _context.Transactions.Add(transaction);
            await _context.SaveChangesAsync();

            _logger.LogInformation("Transaction created successfully for UserId {UserId}", user.UserId);

            return Ok(new
            {
                Message = "Transaction completed successfully.",
                transaction.TransactionId,
                transaction.TransactionType,
                transaction.Amount,
                account.Balance
            });
        }
    }
}
