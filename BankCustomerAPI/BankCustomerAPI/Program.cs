using BankCustomerAPI.Data;
using BankCustomerAPI.Entities;
using BankCustomerAPI.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// -------------------- Database --------------------
builder.Services.AddDbContext<TrainingDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// -------------------- JWT Setup --------------------
builder.Services.AddScoped<IJwtTokenService, JwtTokenService>();

var jwtSettings = builder.Configuration.GetSection("JwtSettings");

var keyString = jwtSettings["Key"]
    ?? throw new InvalidOperationException("JWT Key is missing in configuration.");
var issuer = jwtSettings["Issuer"]
    ?? throw new InvalidOperationException("JWT Issuer is missing in configuration.");
var audience = jwtSettings["Audience"]
    ?? throw new InvalidOperationException("JWT Audience is missing in configuration.");

var key = Encoding.UTF8.GetBytes(keyString);

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = issuer,
        ValidAudience = audience,
        IssuerSigningKey = new SymmetricSecurityKey(key)
    };
});

// -------------------- Controllers --------------------
builder.Services.AddControllers().AddNewtonsoftJson();

// -------------------- Swagger Setup --------------------
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Bank Customer API",
        Version = "v1"
    });

    var securitySchema = new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Description = "Enter 'Bearer {your JWT token}'",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT",
        Reference = new OpenApiReference
        {
            Type = ReferenceType.SecurityScheme,
            Id = "Bearer"
        }
    };

    c.AddSecurityDefinition("Bearer", securitySchema);
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        { securitySchema, new[] { "Bearer" } }
    });
});

var app = builder.Build();

// -------------------- Middleware --------------------
app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Bank Customer API v1");
        c.RoutePrefix = "swagger";
    });
}

app.MapControllers();


// -------------------- Runtime Seeding --------------------
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<TrainingDbContext>();

    context.Database.EnsureCreated(); // Creates DB if missing

    if (!context.Users.Any())
    {
        var users = new List<User>
        {
            new User
            {
                Username = "Super Admin",
                Email = "admin@bank.com",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("admin123"),
                Phone = "9000000001",
                Status = "active",
                UserType = "Admin",
                CreatedAt = DateTime.UtcNow
            },
            new User
            {
                Username = "Manager User",
                Email = "manager@bank.com",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("manager123"),
                Phone = "9000000002",
                Status = "active",
                UserType = "Manager",
                CreatedAt = DateTime.UtcNow
            },
            new User
            {
                Username = "Employee User",
                Email = "employee@bank.com",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("employee123"),
                Phone = "9000000003",
                Status = "active",
                UserType = "Employee",
                CreatedAt = DateTime.UtcNow
            },
            new User
            {
                Username = "Customer User",
                Email = "customer@bank.com",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("customer123"),
                Phone = "9000000004",
                Status = "active",
                UserType = "Customer",
                CreatedAt = DateTime.UtcNow
            }
        };

        context.Users.AddRange(users);
        context.SaveChanges();
        Console.WriteLine("✅ Default users seeded successfully.");
    }
}

app.Run();
