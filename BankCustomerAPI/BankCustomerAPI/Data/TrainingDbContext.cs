using BankCustomerAPI.Entities;
using BankCustomerAPI.Services;
using Microsoft.EntityFrameworkCore;

namespace BankCustomerAPI.Data
{
    public class TrainingDbContext : DbContext
    {
        public TrainingDbContext(DbContextOptions<TrainingDbContext> options)
            : base(options) { }

        // ==========================
        // 🔹 Core Entities
        // ==========================
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Permission> Permissions { get; set; }
        public DbSet<UserRole> UserRoles { get; set; }
        public DbSet<RolePermission> RolePermissions { get; set; }

        // ==========================
        // 🔹 Bank Entities
        // ==========================
        public DbSet<Bank> Banks { get; set; }
        public DbSet<Branch> Branches { get; set; }
        public DbSet<Employee> Employees { get; set; }

        // ==========================
        // 🔹 Account Entities
        // ==========================
        public DbSet<Account> Accounts { get; set; }
        public DbSet<TermDeposit> TermDeposits { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<Poa> Poas { get; set; }
        public DbSet<MinorGuardian> MinorGuardians { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // ==========================
            // 🔸 Composite Keys
            // ==========================
            modelBuilder.Entity<UserRole>().HasKey(ur => new { ur.UserId, ur.RoleId });
            modelBuilder.Entity<RolePermission>().HasKey(rp => new { rp.RoleId, rp.PermissionId });
            modelBuilder.Entity<MinorGuardian>().HasKey(mg => new { mg.MinorUserId, mg.GuardianUserId });

            // ==========================
            // 🔸 Relationships
            // ==========================
            modelBuilder.Entity<Account>()
                .HasOne(a => a.TermDeposit)
                .WithOne(td => td.Account)
                .HasForeignKey<TermDeposit>(td => td.AccountId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<TermDeposit>()
                .HasOne(td => td.LinkedAccount)
                .WithMany()
                .HasForeignKey(td => td.LinkedAccountId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<MinorGuardian>()
                .HasOne(mg => mg.MinorUser)
                .WithMany()
                .HasForeignKey(mg => mg.MinorUserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<MinorGuardian>()
                .HasOne(mg => mg.GuardianUser)
                .WithMany()
                .HasForeignKey(mg => mg.GuardianUserId)
                .OnDelete(DeleteBehavior.Restrict);

            // ==========================
            // 🔸 Decimal Precision
            // ==========================
            modelBuilder.Entity<Account>().Property(a => a.Balance).HasPrecision(18, 2);
            modelBuilder.Entity<Employee>().Property(e => e.Salary).HasPrecision(18, 2);
            modelBuilder.Entity<TermDeposit>().Property(td => td.PrincipalAmount).HasPrecision(18, 2);
            modelBuilder.Entity<TermDeposit>().Property(td => td.InterestRate).HasPrecision(5, 4);
            modelBuilder.Entity<Transaction>().Property(t => t.Amount).HasPrecision(18, 2);

            // ==========================
            // 🔸 Schema
            // ==========================
            modelBuilder.HasDefaultSchema("training");

            // ==========================
            // 🔸 Static Seed Data (NO dynamic values)
            // ==========================
            var createdDate = new DateTime(2025, 01, 01, 0, 0, 0, DateTimeKind.Utc);

            // Pre-hashed passwords (SHA256)
            //const string adminHash = "fXhWj2qkHZH4zUO6R8C5DJV8bErAAHjZClJrr5MFkds=";
            //const string managerHash = "4R2OZzj3rA7SKtkE7CqMiqQzqM5aS+R5+tdX59CyI/A=";
            //const string employeeHash = "1zG9U5RJXZb2Q9eAV+y2B9IpcF3i0L2EDqxU53sE3wo=";
            //const string customerHash = "jM2Dxke9QvVMB6HBIhH7jrqQlbG2AxEo8A6RCVYjW8E=";

            //var adminHash = PasswordHelper.HashPassword("admin123");
            //var managerHash = PasswordHelper.HashPassword("manager123");
            //var customerHash = PasswordHelper.HashPassword("customer123");
            //var guestHash = PasswordHelper.HashPassword("guest123");

            var adminHash = BCrypt.Net.BCrypt.HashPassword("admin123");
            var managerHash = BCrypt.Net.BCrypt.HashPassword("manager123");
            var employeeHash = BCrypt.Net.BCrypt.HashPassword("customer123");
            var customerHash = BCrypt.Net.BCrypt.HashPassword("guest123");

            // Roles
            modelBuilder.Entity<Role>().HasData(
                new Role { RoleId = 1, RoleName = "Admin", Description = "System administrator" },
                new Role { RoleId = 2, RoleName = "Manager", Description = "Bank manager" },
                new Role { RoleId = 3, RoleName = "Employee", Description = "Bank employee" },
                new Role { RoleId = 4, RoleName = "Customer", Description = "Bank customer" }
            );

            // Users
            modelBuilder.Entity<User>().HasData(
                new User { UserId = 1, Username = "Admin User", Email = "admin@bank.com", PasswordHash = adminHash, Phone = "9000000001", Status = "active", CreatedAt = createdDate },
                new User { UserId = 2, Username = "Manager User", Email = "manager@bank.com", PasswordHash = managerHash, Phone = "9000000002", Status = "active", CreatedAt = createdDate },
                new User { UserId = 3, Username = "Employee User", Email = "employee@bank.com", PasswordHash = employeeHash, Phone = "9000000003", Status = "active", CreatedAt = createdDate },
                new User { UserId = 4, Username = "Customer User", Email = "customer@bank.com", PasswordHash = customerHash, Phone = "9000000004", Status = "active", CreatedAt = createdDate }
            );

            // UserRoles
            modelBuilder.Entity<UserRole>().HasData(
                new UserRole { UserId = 1, RoleId = 1 },
                new UserRole { UserId = 2, RoleId = 2 },
                new UserRole { UserId = 3, RoleId = 3 },
                new UserRole { UserId = 4, RoleId = 4 }
            );
        }
    }
}
