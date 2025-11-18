using BankCustomerAPI.Data;
using BankCustomerAPI.Entities;
using BankCustomerAPI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BankCustomerAPI.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly TrainingDbContext _context;
        private readonly IJwtTokenService _jwtTokenService;

        public AuthController(TrainingDbContext context, IJwtTokenService jwtTokenService)
        {
            _context = context;
            _jwtTokenService = jwtTokenService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);

            if (user == null)
                return Unauthorized(new { message = "Invalid credentials" });

            if (!BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
                return Unauthorized(new { message = "Invalid credentials" });

            if (user.Status?.ToLower() == "deleted")
                return StatusCode(403, new { message = "Your account has been deleted. Please contact admin." });

            if (user.Status?.ToLower() == "inactive")
                return StatusCode(403, new { message = "Your account is inactive. Please contact admin." });

            // 🔥 New Access Token
            var accessToken = _jwtTokenService.GenerateToken(
                user.Email,
                user.UserType,
                user.Username
            );

            // 🔥 New Refresh Token
            var refreshToken = _jwtTokenService.GenerateRefreshToken();
            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);

            await _context.SaveChangesAsync();

            return Ok(new
            {
                token = accessToken,         // 🔹 Same as before
                refreshToken = refreshToken, // 🔹 NEW
                username = user.Username,
                role = user.UserType,
                expiresIn = 900,             // 15 min
                message = "Login successful"
            });
        }


        // ⭐ NEW: REFRESH ENDPOINT
        [HttpPost("refresh")]
        public async Task<IActionResult> Refresh([FromBody] RefreshRequest request)
        {
            if (string.IsNullOrEmpty(request.RefreshToken))
                return BadRequest(new { message = "Refresh token is required" });

            var user = await _context.Users.FirstOrDefaultAsync(u => u.RefreshToken == request.RefreshToken);

            if (user == null)
                return Unauthorized(new { message = "Invalid refresh token" });

            if (!user.RefreshTokenExpiryTime.HasValue || user.RefreshTokenExpiryTime <= DateTime.UtcNow)
                return Unauthorized(new { message = "Refresh token expired" });

            // 🔥 ROTATE TOKEN (security best practice)
            var newAccessToken = _jwtTokenService.GenerateToken(
                user.Email,
                user.UserType,
                user.Username
            );

            var newRefreshToken = _jwtTokenService.GenerateRefreshToken();

            user.RefreshToken = newRefreshToken;
            user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);

            await _context.SaveChangesAsync();

            return Ok(new
            {
                token = newAccessToken,
                refreshToken = newRefreshToken,
                username = user.Username,
                role = user.UserType,
                expiresIn = 900,
                message = "Token refreshed"
            });
        }
    }

    public class LoginRequest
    {
        public string Email { get; set; } = "";
        public string Password { get; set; } = "";
    }

    public class RefreshRequest
    {
        public string RefreshToken { get; set; } = "";
    }
}
