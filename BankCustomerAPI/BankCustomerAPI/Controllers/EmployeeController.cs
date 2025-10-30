using BankCustomerAPI.Data;
using BankCustomerAPI.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BankCustomerAPI.Controllers
{
    [ApiController]
    [Route("api/employee")]
    [Authorize(Roles = "Employee")]
    public class EmployeeController : ControllerBase
    {
        private readonly TrainingDbContext _context;

        public EmployeeController(TrainingDbContext context)
        {
            _context = context;
        }

        // GET: /api/employee/accounts
        [HttpGet("accounts")]
        public async Task<IActionResult> GetAllAccounts()
        {
            var accounts = await _context.Accounts.Include(a => a.User).ToListAsync();
            return Ok(accounts);
        }

        // POST: /api/employee/account
        [HttpPost("account")]
        public async Task<IActionResult> CreateAccount([FromBody] Account account)
        {
            _context.Accounts.Add(account);
            await _context.SaveChangesAsync();
            return Ok(account);
        }

        // PUT: /api/employee/account/{id}
        [HttpPut("account/{id}")]
        public async Task<IActionResult> UpdateAccount(int id, [FromBody] Account updated)
        {
            var account = await _context.Accounts.FindAsync(id);
            if (account == null) return NotFound("Account not found");

            account.AccountType = updated.AccountType;
            account.Status = updated.Status;
            account.UpdatedAt = DateTime.Now;

            await _context.SaveChangesAsync();
            return Ok(account);
        }
    }
}
