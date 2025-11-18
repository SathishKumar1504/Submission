using BankCustomerAPI.Data;
using BankCustomerAPI.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BankCustomerAPI.Controllers
{
    [ApiController]
    [Route("api/admin/banks")]
    [Authorize(Roles = "Admin")]
    public class AdminBanksController : ControllerBase
    {
        private readonly TrainingDbContext _db;
        public AdminBanksController(TrainingDbContext db) { _db = db; }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var banks = await _db.Banks.Include(b => b.Branches).ToListAsync();
            return Ok(new { success = true, banks });
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Bank bank)
        {
            if (bank == null) return BadRequest();
            _db.Banks.Add(bank);
            await _db.SaveChangesAsync();
            return Ok(new { success = true, bank });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var bank = await _db.Banks.Include(b => b.Branches).FirstOrDefaultAsync(b => b.BankId == id);
            if (bank == null) return NotFound();
            // optional: delete branches cascade
            _db.Banks.Remove(bank);
            await _db.SaveChangesAsync();
            return Ok(new { success = true, message = "Bank deleted" });
        }
    }
}
