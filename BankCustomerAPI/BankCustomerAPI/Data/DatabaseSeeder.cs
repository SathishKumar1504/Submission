using BankCustomerAPI.Entities;
using BCrypt.Net;

namespace BankCustomerAPI.Data
{
    public static class DatabaseSeeder
    {
        public static void Seed(TrainingDbContext context)
        {
            if (!context.Roles.Any())
            {
                context.Roles.AddRange(
                    new Role { RoleId = 1, RoleName = "Admin", Description = "System administrator" },
                    new Role { RoleId = 2, RoleName = "Manager", Description = "Bank manager" },
                    new Role { RoleId = 3, RoleName = "Employee", Description = "Bank employee" },
                    new Role { RoleId = 4, RoleName = "Customer", Description = "Bank customer" }
                );
                context.SaveChanges();
            }

            if (!context.Users.Any())
            {
                var users = new List<User>
                {
                    new User
                    {
                        UserId = 1,
                        Username = "Admin User",
                        Email = "admin@bank.com",
                        PasswordHash = BCrypt.Net.BCrypt.HashPassword("admin123"), // 🔐 Hashed at runtime
                        Phone = "9000000001",
                        Status = "active",
                        CreatedAt = DateTime.UtcNow
                    },
                    new User
                    {
                        UserId = 2,
                        Username = "Manager User",
                        Email = "manager@bank.com",
                        PasswordHash = BCrypt.Net.BCrypt.HashPassword("manager123"),
                        Phone = "9000000002",
                        Status = "active",
                        CreatedAt = DateTime.UtcNow
                    },
                    new User
                    {
                        UserId = 3,
                        Username = "Employee User",
                        Email = "employee@bank.com",
                        PasswordHash = BCrypt.Net.BCrypt.HashPassword("employee123"),
                        Phone = "9000000003",
                        Status = "active",
                        CreatedAt = DateTime.UtcNow
                    },
                    new User
                    {
                        UserId = 4,
                        Username = "Customer User",
                        Email = "customer@bank.com",
                        PasswordHash = BCrypt.Net.BCrypt.HashPassword("customer123"),
                        Phone = "9000000004",
                        Status = "active",
                        CreatedAt = DateTime.UtcNow
                    }
                };

                context.Users.AddRange(users);
                context.SaveChanges();

                // Assign Roles
                var userRoles = new List<UserRole>
                {
                    new UserRole { UserId = 1, RoleId = 1 },
                    new UserRole { UserId = 2, RoleId = 2 },
                    new UserRole { UserId = 3, RoleId = 3 },
                    new UserRole { UserId = 4, RoleId = 4 }
                };

                context.UserRoles.AddRange(userRoles);
                context.SaveChanges();
            }
        }
    }
}
