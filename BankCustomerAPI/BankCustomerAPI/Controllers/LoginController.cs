using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace BankCustomerAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly IConfiguration _config;

        public LoginController(IConfiguration config)
        {
            _config = config;
        }

        [HttpPost]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            // ✅ 1. Dummy check (replace later with real DB lookup)
            if (request.Email != "admin@bank.com" || request.Password != "admin123")
                return Unauthorized("Invalid credentials");

            // ✅ 2. Read private key
            var privateKeyPath = _config["Jwt:PrivateKeyPath"];
            if (!System.IO.File.Exists(privateKeyPath))
                return NotFound("Private key not found.");

            var privateKey = RSA.Create();
            privateKey.ImportFromPem(System.IO.File.ReadAllText(privateKeyPath));

            // ✅ 3. Create token claims
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, "1"),
                new Claim(JwtRegisteredClaimNames.Email, request.Email),
                new Claim("role", "Admin"),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            // ✅ 4. Create signing credentials
            var creds = new SigningCredentials(new RsaSecurityKey(privateKey), SecurityAlgorithms.RsaSha256);

            // ✅ 5. Build token
            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(60),
                signingCredentials: creds
            );

            return Ok(new
            {
                token = new JwtSecurityTokenHandler().WriteToken(token),
                expires = token.ValidTo
            });
        }

        public class LoginRequest
        {
            public string Email { get; set; }
            public string Password { get; set; }
        }
    }
}
