using BankCustomerAPI.Data;
using BankCustomerAPI.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BankCustomerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class BanksController : ControllerBase
    {
        private readonly TrainingDbContext _db;

        public BanksController(TrainingDbContext db)
        {
            _db = db;
        }

        // GET: api/banks
        [HttpGet]
        public async Task<IActionResult> GetBanks()
        {
            var banks = await _db.Banks
                .Include(b => b.Branches)
                .ToListAsync();

            return Ok(new { success = true, banks });
        }

        // POST: api/banks
        [HttpPost]
        public async Task<IActionResult> AddBank([FromBody] Bank bank)
        {
            _db.Banks.Add(bank);
            await _db.SaveChangesAsync();

            return Ok(new { message = "Bank created", bankId = bank.BankId });
        }

        // GET: api/banks/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetBank(int id)
        {
            var bank = await _db.Banks
                .Include(b => b.Branches)
                .FirstOrDefaultAsync(b => b.BankId == id);

            if (bank == null) return NotFound(new { message = "Bank not found" });

            return Ok(new { success = true, bank });
        }

        // POST: api/banks/{id}/branches
        [HttpPost("{id}/branches")]
        public async Task<IActionResult> AddBranch(int id, [FromBody] Branch branch)
        {
            branch.BankId = id;
            _db.Branches.Add(branch);

            await _db.SaveChangesAsync();

            return Ok(new { message = "Branch added", branchId = branch.BranchId });
        }
    }
}
