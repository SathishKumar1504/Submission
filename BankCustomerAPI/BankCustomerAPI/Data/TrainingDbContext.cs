using BankCustomerAPI.Entities;
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
        }
    }
}
