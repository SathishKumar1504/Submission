using BankCustomerAPI.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// ====================================================
// 1️⃣ Configure Services
// ====================================================

// --- Database (SQL Server) ---
builder.Services.AddDbContext<TrainingDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// --- JWT Authentication (Temporarily Disabled for Migration) ---
// ---------------------------------------------------------------
// Commented out so EF tools (dotnet ef database update) won't fail
// You can uncomment this later when you add JWT support again

/*
var jwtSection = builder.Configuration.GetSection("Jwt");

// Build full path from project root instead of bin folder
var publicKeyPath = Path.Combine(Directory.GetCurrentDirectory(), jwtSection.GetValue<string>("PublicKeyPath") ?? string.Empty);

Console.WriteLine($"Looking for public key at: {publicKeyPath}");

if (!File.Exists(publicKeyPath))
{
    throw new FileNotFoundException($"Public key not found: {publicKeyPath}");
}

// Load the PEM key content correctly
var publicKeyText = File.ReadAllText(publicKeyPath);
using var rsa = RSA.Create();
rsa.ImportFromPem(publicKeyText.AsSpan());
var key = new RsaSecurityKey(rsa);

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwtSection["Issuer"],
            ValidAudience = jwtSection["Audience"],
            IssuerSigningKey = key
        };
    });
*/

// --- Controllers ---
builder.Services.AddControllers();

// ====================================================
// 2️⃣ Build and Configure App
// ====================================================

var app = builder.Build();

app.UseHttpsRedirection();

// app.UseAuthentication(); // 👈 Uncomment later when JWT is re-enabled
app.UseAuthorization();

app.MapControllers();

app.Run();
