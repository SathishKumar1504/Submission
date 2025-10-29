using BankCustomerAPI.Data;
using BankCustomerAPI.Entities;
using Microsoft.AspNetCore.Mvc;

namespace BankCustomerAPI.Controllers
{
    [ApiController]
    [Route("bankemployee/manage")]  // ✅ distinct route to avoid conflict
    public class BankEmployeeController : ControllerBase
    {
        private readonly TrainingDbContext _context;

        public BankEmployeeController(TrainingDbContext context)
        {
            _context = context;
        }

        // =====================================================
        // GET: /bankemployee/manage
        // =====================================================
        [HttpGet]
        public IActionResult GetAllEmployees()
        {
            var employees = _context.Employees.ToList();
            return Ok(employees);
        }

        // =====================================================
        // GET: /bankemployee/manage/{id}
        // =====================================================
        [HttpGet("{id}")]
        public IActionResult GetEmployeeById(int id)
        {
            var employee = _context.Employees.Find(id);
            if (employee == null)
                return NotFound($"Employee with ID {id} not found.");

            return Ok(employee);
        }

        // =====================================================
        // POST: /bankemployee/manage
        // =====================================================
        [HttpPost]
        public IActionResult AddEmployee([FromBody] Employee employee)
        {
            if (employee == null)
                return BadRequest("Invalid employee data.");

            _context.Employees.Add(employee);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetEmployeeById), new { id = employee.EmployeeId }, employee);
        }

        // =====================================================
        // PUT: /bankemployee/manage/{id}
        // =====================================================
        [HttpPut("{id}")]
        public IActionResult UpdateEmployee(int id, [FromBody] Employee updatedEmployee)
        {
            var existing = _context.Employees.Find(id);
            if (existing == null)
                return NotFound($"Employee with ID {id} not found.");

            existing.EmployeeName = updatedEmployee.EmployeeName;
            existing.Designation = updatedEmployee.Designation;
            existing.Salary = updatedEmployee.Salary;
            existing.Status = updatedEmployee.Status;
            existing.UpdatedAt = DateTime.Now;

            _context.SaveChanges();
            return NoContent();
        }

        // =====================================================
        // DELETE: /bankemployee/manage/{id}
        // =====================================================
        [HttpDelete("{id}")]
        public IActionResult DeleteEmployee(int id)
        {
            var employee = _context.Employees.Find(id);
            if (employee == null)
                return NotFound($"Employee with ID {id} not found.");

            _context.Employees.Remove(employee);
            _context.SaveChanges();
            return NoContent();
        }
    }
}
