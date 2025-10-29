using BankCustomerAPI.Entities;
//using BankCustomerAPI.Helpers;
using BankCustomerAPI.Services;

using Microsoft.EntityFrameworkCore;
using System;

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
        public DbSet<Employee> Employees { get; set; }   // ✅ from Entities folder

        // ==========================
        // 🔹 Account Entities
        // ==========================
        public DbSet<Account> Accounts { get; set; }
        public DbSet<TermDeposit> TermDeposits { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<Poa> Poas { get; set; }
        public DbSet<MinorGuardian> MinorGuardians { get; set; }

        // ==========================
        // 🔹 Model Configuration
        // ==========================
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // ==========================
            // 🔸 Composite Keys
            // ==========================
            modelBuilder.Entity<UserRole>()
                .HasKey(ur => new { ur.UserId, ur.RoleId });

            modelBuilder.Entity<RolePermission>()
                .HasKey(rp => new { rp.RoleId, rp.PermissionId });

            modelBuilder.Entity<MinorGuardian>()
                .HasKey(mg => new { mg.MinorUserId, mg.GuardianUserId });

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
            // 🔸 Decimal Precision Configurations
            // ==========================
            modelBuilder.Entity<Account>()
                .Property(a => a.Balance)
                .HasPrecision(18, 2);

            modelBuilder.Entity<Employee>()
                .Property(e => e.Salary)
                .HasPrecision(18, 2);

            modelBuilder.Entity<TermDeposit>()
                .Property(td => td.PrincipalAmount)
                .HasPrecision(18, 2);

            modelBuilder.Entity<TermDeposit>()
                .Property(td => td.InterestRate)
                .HasPrecision(5, 4);

            modelBuilder.Entity<Transaction>()
                .Property(t => t.Amount)
                .HasPrecision(18, 2);

            // ==========================
            // 🔸 Default Schema
            // ==========================
            modelBuilder.HasDefaultSchema("training");

            // ==========================
            // 🔹 Seed Data
            // ==========================

            // Roles
            modelBuilder.Entity<Role>().HasData(
                new Role { RoleId = 1, RoleName = "Admin", Description = "System administrator" },
                new Role { RoleId = 2, RoleName = "Manager", Description = "Bank manager" },
                new Role { RoleId = 3, RoleName = "Cashier", Description = "Handles transactions" },
                new Role { RoleId = 4, RoleName = "Customer", Description = "Bank customer" }
            );

            // Users (with hashed passwords)
            modelBuilder.Entity<User>().HasData(
                new User
                {
                    UserId = 1,
                    Username = "admin",
                    Email = "admin@bank.com",
                    PasswordHash = PasswordHasher.HashPassword("Admin@123"),
                    Status = "active",
                    CreatedAt = DateTime.Now
                },
                new User
                {
                    UserId = 2,
                    Username = "manager",
                    Email = "manager@bank.com",
                    PasswordHash = PasswordHasher.HashPassword("Manager@123"),
                    Status = "active",
                    CreatedAt = DateTime.Now
                },
                new User
                {
                    UserId = 3,
                    Username = "cashier",
                    Email = "cashier@bank.com",
                    PasswordHash = PasswordHasher.HashPassword("Cashier@123"),
                    Status = "active",
                    CreatedAt = DateTime.Now
                },
                new User
                {
                    UserId = 4,
                    Username = "customer",
                    Email = "customer@bank.com",
                    PasswordHash = PasswordHasher.HashPassword("Customer@123"),
                    Status = "active",
                    CreatedAt = DateTime.Now
                }
            );

            // UserRoles (link users to roles)
            modelBuilder.Entity<UserRole>().HasData(
                new UserRole { UserId = 1, RoleId = 1 },
                new UserRole { UserId = 2, RoleId = 2 },
                new UserRole { UserId = 3, RoleId = 3 },
                new UserRole { UserId = 4, RoleId = 4 }
            );
        }
    }
}
