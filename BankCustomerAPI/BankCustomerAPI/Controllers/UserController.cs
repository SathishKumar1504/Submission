using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BankCustomerAPI.Data;
using BankCustomerAPI.Entities;

namespace BankCustomerAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")] // Route: /api/user
    public class UserController : ControllerBase
    {
        private readonly TrainingDbContext _context;

        public UserController(TrainingDbContext context)
        {
            _context = context;
        }

        // ✅ GET all users
        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _context.Users.ToListAsync();
            return Ok(users);
        }

        // ✅ GET user by ID
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
                return NotFound(new { message = $"User with ID {id} not found." });

            return Ok(user);
        }

        // ✅ CREATE new user
        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] User user)
        {
            if (user == null)
                return BadRequest(new { message = "Invalid user data." });

            if (string.IsNullOrWhiteSpace(user.Email))
                return BadRequest(new { message = "Email is required." });

            if (await _context.Users.AnyAsync(u => u.Email == user.Email))
                return Conflict(new { message = "Email already exists." });

            user.CreatedAt = DateTime.Now;
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(user.PasswordHash);

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUserById), new { id = user.UserId }, user);
        }

        // ✅ UPDATE existing user
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] User updatedUser)
        {
            var existingUser = await _context.Users.FindAsync(id);
            if (existingUser == null)
                return NotFound(new { message = $"User with ID {id} not found." });

            existingUser.Username = updatedUser.Username;
            existingUser.Email = updatedUser.Email;
            existingUser.Phone = updatedUser.Phone;
            existingUser.UserType = updatedUser.UserType;
            existingUser.Status = updatedUser.Status;
            existingUser.DateOfBirth = updatedUser.DateOfBirth;
            existingUser.UpdatedAt = DateTime.Now;

            // Optional: only update password if provided
            if (!string.IsNullOrWhiteSpace(updatedUser.PasswordHash))
                existingUser.PasswordHash = BCrypt.Net.BCrypt.HashPassword(updatedUser.PasswordHash);

            await _context.SaveChangesAsync();

            return Ok(new { message = "User updated successfully.", user = existingUser });
        }

        // ✅ DELETE user
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
                return NotFound(new { message = $"User with ID {id} not found." });

            // Soft delete (optional)
            user.Status = "deleted";
            user.DeletedAt = DateTime.Now;

            // If you want permanent delete instead:
            // _context.Users.Remove(user);

            await _context.SaveChangesAsync();

            return Ok(new { message = "User deleted successfully." });
        }
    }
}
