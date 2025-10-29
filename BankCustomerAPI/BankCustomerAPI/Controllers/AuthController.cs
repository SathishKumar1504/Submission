using BankCustomerAPI.Data;
using BankCustomerAPI.Entities;
using BankCustomerAPI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BCrypt.Net; // ✅ add this for hashing

namespace BankCustomerAPI.Controllers
{
    [ApiController]
    [Route("bankemployee")]
    public class AuthController : ControllerBase
    {
        private readonly TrainingDbContext _context;
        private readonly IJwtTokenService _jwtTokenService;

        public AuthController(TrainingDbContext context, IJwtTokenService jwtTokenService)
        {
            _context = context;
            _jwtTokenService = jwtTokenService;
        }

        // =====================================================
        // POST: /bankemployee/register
        // =====================================================
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User user)
        {
            if (user == null || string.IsNullOrWhiteSpace(user.Email) || string.IsNullOrWhiteSpace(user.PasswordHash))
                return BadRequest("Invalid user data.");

            if (await _context.Users.AnyAsync(u => u.Email == user.Email))
                return Conflict("Email already exists.");

            // ✅ Hash the password before saving
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(user.PasswordHash);
            user.CreatedAt = DateTime.Now;

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok("User registered successfully!");
        }

        // =====================================================
        // POST: /bankemployee/login
        // =====================================================
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            if (request == null || string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.Password))
                return BadRequest("Invalid credentials.");

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);

            if (user == null)
                return Unauthorized("Invalid email or password.");

            // ✅ Verify the hashed password
            bool isValidPassword = BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash);
            if (!isValidPassword)
                return Unauthorized("Invalid email or password.");

            var token = _jwtTokenService.GenerateToken(user.Email, user.UserType);
            return Ok(new { token, user.Email, user.UserType });
        }
    }

    public class LoginRequest
    {
        public string Email { get; set; } = "";
        public string Password { get; set; } = "";
    }
}
