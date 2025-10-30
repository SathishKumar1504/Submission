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
        private readonly ILogger<AuthController> _logger;

        public AuthController(TrainingDbContext context, IJwtTokenService jwtTokenService , ILogger<AuthController>logger)
        {
            _context = context;
            _jwtTokenService = jwtTokenService;
            _logger = logger;
        }

        // =====================================================
        // POST: /bankemployee/register
        // =====================================================
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User user)
        {
            if (user == null || string.IsNullOrWhiteSpace(user.Email) || string.IsNullOrWhiteSpace(user.PasswordHash))
            { 
                _logger.LogWarning("Registration attempt with invalid data.");
                return BadRequest("Invalid user data."); }

            if (await _context.Users.AnyAsync(u => u.Email == user.Email))
            {
                _logger.LogWarning("Registration attempt with existing email: {Email}", user.Email);
                return Conflict("Email already exists.");
            }

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
            {
                _logger.LogWarning("Login attempt with invalid data.");
                return BadRequest("Invalid credentials.");
            }

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);

            if (user == null)
            {
                _logger.LogWarning("Login attempt with non-existing email: {Email}", request.Email);
                return Unauthorized("Invalid email or password.");
            }
            // ✅ Verify the hashed password
            bool isValidPassword = BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash);
            if (!isValidPassword)
            {
                _logger.LogWarning("Login attempt with invalid password for email: {Email}", request.Email);
                return Unauthorized("Invalid email or password.");
            }

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
