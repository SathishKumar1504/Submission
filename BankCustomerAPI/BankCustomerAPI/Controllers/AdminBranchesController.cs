using BankCustomerAPI.Data;
using BankCustomerAPI.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BankCustomerAPI.Controllers
{
    [ApiController]
    [Route("api/admin/branches")]
    [Authorize(Roles = "Admin")]
    public class AdminBranchesController : ControllerBase
    {
        private readonly TrainingDbContext _db;
        public AdminBranchesController(TrainingDbContext db) { _db = db; }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var branches = await _db.Branches.Include(b => b.Bank).ToListAsync();
            return Ok(new { success = true, branches });
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Branch branch)
        {
            _db.Branches.Add(branch);
            await _db.SaveChangesAsync();
            return Ok(new { success = true, branch });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var br = await _db.Branches.FindAsync(id);
            if (br == null) return NotFound();
            _db.Branches.Remove(br);
            await _db.SaveChangesAsync();
            return Ok(new { success = true, message = "Branch deleted" });
        }
    }
}
