using System.Security.Cryptography;
using System.Text;
using BankCustomerAPI.Entities;

namespace BankCustomerAPI.Data
{
    public static class DbSeeder
    {
        public static void Seed(TrainingDbContext context)
        {
            // make sure DB exists
            context.Database.EnsureCreated();

            // seed Roles
            if (!context.Roles.Any())
            {
                var roles = new List<Role>
                {
                    new Role { RoleName = "Admin" },
                    new Role { RoleName = "Manager" },
                    new Role { RoleName = "Employee" },
                    new Role { RoleName = "Customer" }
                };
                context.Roles.AddRange(roles);
                context.SaveChanges();
            }

            // helper for hashing passwords
            string HashPassword(string password)
            {
                using var sha256 = SHA256.Create();
                var bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                return Convert.ToHexString(bytes);
            }

            // seed Users
            if (!context.Users.Any())
            {
                var users = new List<User>
                {
                    new User { Username = "Admin User",  Email = "admin@bank.com",  PasswordHash = HashPassword("Admin@123"), UserType = "admin" },
                    new User { Username = "Manager User",Email = "manager@bank.com",PasswordHash = HashPassword("Manager@123"),UserType = "manager" },
                    new User { Username = "Employee User",Email = "employee@bank.com",PasswordHash = HashPassword("Employee@123"),UserType = "employee" },
                    new User { Username = "Customer User",Email = "customer@bank.com",PasswordHash = HashPassword("Customer@123"),UserType = "customer" }
                };
                context.Users.AddRange(users);
                context.SaveChanges();
            }

            // link Users to Roles
            if (!context.UserRoles.Any())
            {
                var adminRole = context.Roles.First(r => r.RoleName == "Admin");
                var managerRole = context.Roles.First(r => r.RoleName == "Manager");
                var employeeRole = context.Roles.First(r => r.RoleName == "Employee");
                var customerRole = context.Roles.First(r => r.RoleName == "Customer");

                var adminUser = context.Users.First(u => u.Email == "admin@bank.com");
                var managerUser = context.Users.First(u => u.Email == "manager@bank.com");
                var employeeUser = context.Users.First(u => u.Email == "employee@bank.com");
                var customerUser = context.Users.First(u => u.Email == "customer@bank.com");

                var userRoles = new List<UserRole>
                {
                    new UserRole { UserId = adminUser.UserId, RoleId = adminRole.RoleId },
                    new UserRole { UserId = managerUser.UserId, RoleId = managerRole.RoleId },
                    new UserRole { UserId = employeeUser.UserId, RoleId = employeeRole.RoleId },
                    new UserRole { UserId = customerUser.UserId, RoleId = customerRole.RoleId }
                };

                context.UserRoles.AddRange(userRoles);
                context.SaveChanges();
            }
        }
    }
}
