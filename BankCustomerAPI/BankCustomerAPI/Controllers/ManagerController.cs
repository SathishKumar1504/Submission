using BankCustomerAPI.Data;
using BankCustomerAPI.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BankCustomerAPI.Controllers
{
    [ApiController]
    [Route("api/manager")]
    [Authorize(Roles = "Manager")]
    public class ManagerController : ControllerBase
    {
        private readonly TrainingDbContext _context;

        public ManagerController(TrainingDbContext context)
        {
            _context = context;
        }

        // ===========================================================
        // GET: /api/manager/employees
        // ===========================================================
        [HttpGet("employees")]
        public async Task<IActionResult> GetAllEmployees()
        {
            var employees = await _context.Users
                .Where(u => u.UserType == "Employee")
                .ToListAsync();

            return Ok(employees);
        }

        // ===========================================================
        // GET: /api/manager/customers
        // ===========================================================
        [HttpGet("customers")]
        public async Task<IActionResult> GetAllCustomers()
        {
            var customers = await _context.Users
                .Where(u => u.UserType == "Customer")
                .ToListAsync();

            return Ok(customers);
        }

        // ===========================================================
        // PUT: /api/manager/employee/{id}
        // ===========================================================
        [HttpPut("employee/{id}")]
        public async Task<IActionResult> UpdateEmployeeStatus(int id, [FromBody] string status)
        {
            var employee = await _context.Users
                .FirstOrDefaultAsync(u => u.UserId == id && u.UserType == "Employee");

            if (employee == null)
                return NotFound("Employee not found");

            employee.Status = status;
            employee.UpdatedAt = DateTime.Now;

            await _context.SaveChangesAsync();

            return Ok(new
            {
                Message = "Employee status updated successfully",
                Employee = employee
            });
        }

        // ===========================================================
        // POST: /api/manager/assign-role
        // ===========================================================
        [HttpPost("assign-role")]
        public async Task<IActionResult> AssignRole([FromBody] UserRole request)
        {
            if (!await _context.Users.AnyAsync(u => u.UserId == request.UserId))
                return BadRequest("Invalid UserId");

            if (!await _context.Roles.AnyAsync(r => r.RoleId == request.RoleId))
                return BadRequest("Invalid RoleId");

            _context.UserRoles.Add(request);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                Message = "Role assigned successfully",
                AssignedRole = request
            });
        }
    }
}
