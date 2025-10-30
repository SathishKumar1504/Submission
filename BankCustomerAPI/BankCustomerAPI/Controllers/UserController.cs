using Microsoft.AspNetCore.Mvc;
using BankCustomerAPI.Data;
using Microsoft.EntityFrameworkCore;

namespace BankCustomerAPI.Controllers
{
    [ApiController]
    [Route("api/user")]
    public class UserController : ControllerBase
    {
        private readonly TrainingDbContext _context;
        public UserController(TrainingDbContext context) => _context = context;

        [HttpGet]
        public async Task<IActionResult> GetUsers() => Ok(await _context.Users.ToListAsync());
    }
}
