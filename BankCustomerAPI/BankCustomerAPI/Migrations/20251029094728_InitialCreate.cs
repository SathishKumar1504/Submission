using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace BankCustomerAPI.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "training");

            migrationBuilder.CreateTable(
                name: "Bank",
                schema: "training",
                columns: table => new
                {
                    BankId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BankName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Bank", x => x.BankId);
                });

            migrationBuilder.CreateTable(
                name: "Permission",
                schema: "training",
                columns: table => new
                {
                    PermissionId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PermissionName = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Permission", x => x.PermissionId);
                });

            migrationBuilder.CreateTable(
                name: "Role",
                schema: "training",
                columns: table => new
                {
                    RoleId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Role", x => x.RoleId);
                });

            migrationBuilder.CreateTable(
                name: "User",
                schema: "training",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Username = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Phone = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DateOfBirth = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.UserId);
                });

            migrationBuilder.CreateTable(
                name: "Branch",
                schema: "training",
                columns: table => new
                {
                    BranchId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BranchName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BankId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Branch", x => x.BranchId);
                    table.ForeignKey(
                        name: "FK_Branch_Bank_BankId",
                        column: x => x.BankId,
                        principalSchema: "training",
                        principalTable: "Bank",
                        principalColumn: "BankId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RolePermission",
                schema: "training",
                columns: table => new
                {
                    RoleId = table.Column<int>(type: "int", nullable: false),
                    PermissionId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RolePermission", x => new { x.RoleId, x.PermissionId });
                    table.ForeignKey(
                        name: "FK_RolePermission_Permission_PermissionId",
                        column: x => x.PermissionId,
                        principalSchema: "training",
                        principalTable: "Permission",
                        principalColumn: "PermissionId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RolePermission_Role_RoleId",
                        column: x => x.RoleId,
                        principalSchema: "training",
                        principalTable: "Role",
                        principalColumn: "RoleId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MinorGuardian",
                schema: "training",
                columns: table => new
                {
                    MinorUserId = table.Column<int>(type: "int", nullable: false),
                    GuardianUserId = table.Column<int>(type: "int", nullable: false),
                    GuardianId = table.Column<int>(type: "int", nullable: false),
                    Relation = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AssignedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MinorGuardian", x => new { x.MinorUserId, x.GuardianUserId });
                    table.ForeignKey(
                        name: "FK_MinorGuardian_User_GuardianUserId",
                        column: x => x.GuardianUserId,
                        principalSchema: "training",
                        principalTable: "User",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_MinorGuardian_User_MinorUserId",
                        column: x => x.MinorUserId,
                        principalSchema: "training",
                        principalTable: "User",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "UserRole",
                schema: "training",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false),
                    RoleId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserRole", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_UserRole_Role_RoleId",
                        column: x => x.RoleId,
                        principalSchema: "training",
                        principalTable: "Role",
                        principalColumn: "RoleId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserRole_User_UserId",
                        column: x => x.UserId,
                        principalSchema: "training",
                        principalTable: "User",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Accounts",
                schema: "training",
                columns: table => new
                {
                    AccountId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AccountNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AccountType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Balance = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
                    Currency = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsMinor = table.Column<bool>(type: "bit", nullable: false),
                    IsPOA = table.Column<bool>(type: "bit", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    BranchId = table.Column<int>(type: "int", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LastTransactionDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ClosedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Accounts", x => x.AccountId);
                    table.ForeignKey(
                        name: "FK_Accounts_Branch_BranchId",
                        column: x => x.BranchId,
                        principalSchema: "training",
                        principalTable: "Branch",
                        principalColumn: "BranchId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Accounts_User_UserId",
                        column: x => x.UserId,
                        principalSchema: "training",
                        principalTable: "User",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "employee",
                schema: "training",
                columns: table => new
                {
                    employeeid = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    userid = table.Column<int>(type: "int", nullable: true),
                    branchid = table.Column<int>(type: "int", nullable: false),
                    roleid = table.Column<int>(type: "int", nullable: true),
                    employeename = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    designation = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    salary = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: true),
                    hiredate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    status = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    createdat = table.Column<DateTime>(type: "datetime2", nullable: false),
                    updatedat = table.Column<DateTime>(type: "datetime2", nullable: true),
                    terminatedat = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_employee", x => x.employeeid);
                    table.ForeignKey(
                        name: "FK_employee_Branch_branchid",
                        column: x => x.branchid,
                        principalSchema: "training",
                        principalTable: "Branch",
                        principalColumn: "BranchId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_employee_Role_roleid",
                        column: x => x.roleid,
                        principalSchema: "training",
                        principalTable: "Role",
                        principalColumn: "RoleId");
                    table.ForeignKey(
                        name: "FK_employee_User_userid",
                        column: x => x.userid,
                        principalSchema: "training",
                        principalTable: "User",
                        principalColumn: "UserId");
                });

            migrationBuilder.CreateTable(
                name: "Poa",
                schema: "training",
                columns: table => new
                {
                    PoaId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AccountId = table.Column<int>(type: "int", nullable: false),
                    GrantedTo = table.Column<int>(type: "int", nullable: false),
                    GrantedToUserUserId = table.Column<int>(type: "int", nullable: true),
                    ValidFrom = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ValidTo = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    RevokedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Poa", x => x.PoaId);
                    table.ForeignKey(
                        name: "FK_Poa_Accounts_AccountId",
                        column: x => x.AccountId,
                        principalSchema: "training",
                        principalTable: "Accounts",
                        principalColumn: "AccountId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Poa_User_GrantedToUserUserId",
                        column: x => x.GrantedToUserUserId,
                        principalSchema: "training",
                        principalTable: "User",
                        principalColumn: "UserId");
                });

            migrationBuilder.CreateTable(
                name: "TermDeposit",
                schema: "training",
                columns: table => new
                {
                    TermDepositId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AccountId = table.Column<int>(type: "int", nullable: false),
                    PrincipalAmount = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
                    InterestRate = table.Column<decimal>(type: "decimal(5,4)", precision: 5, scale: 4, nullable: false),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    MaturityDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ClosedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LinkedAccountId = table.Column<int>(type: "int", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TermDeposit", x => x.TermDepositId);
                    table.ForeignKey(
                        name: "FK_TermDeposit_Accounts_AccountId",
                        column: x => x.AccountId,
                        principalSchema: "training",
                        principalTable: "Accounts",
                        principalColumn: "AccountId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TermDeposit_Accounts_LinkedAccountId",
                        column: x => x.LinkedAccountId,
                        principalSchema: "training",
                        principalTable: "Accounts",
                        principalColumn: "AccountId");
                });

            migrationBuilder.CreateTable(
                name: "Transaction",
                schema: "training",
                columns: table => new
                {
                    TransactionId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AccountId = table.Column<int>(type: "int", nullable: false),
                    TransactionType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Amount = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
                    TransDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    PerformedBy = table.Column<int>(type: "int", nullable: true),
                    PerformedByUserUserId = table.Column<int>(type: "int", nullable: true),
                    ApprovedBy = table.Column<int>(type: "int", nullable: true),
                    ApprovedByEmployeeEmployeeId = table.Column<int>(type: "int", nullable: true),
                    Remarks = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Transaction", x => x.TransactionId);
                    table.ForeignKey(
                        name: "FK_Transaction_Accounts_AccountId",
                        column: x => x.AccountId,
                        principalSchema: "training",
                        principalTable: "Accounts",
                        principalColumn: "AccountId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Transaction_User_PerformedByUserUserId",
                        column: x => x.PerformedByUserUserId,
                        principalSchema: "training",
                        principalTable: "User",
                        principalColumn: "UserId");
                    table.ForeignKey(
                        name: "FK_Transaction_employee_ApprovedByEmployeeEmployeeId",
                        column: x => x.ApprovedByEmployeeEmployeeId,
                        principalSchema: "training",
                        principalTable: "employee",
                        principalColumn: "employeeid");
                });

            migrationBuilder.InsertData(
                schema: "training",
                table: "Role",
                columns: new[] { "RoleId", "Description", "RoleName" },
                values: new object[,]
                {
                    { 1, "System administrator", "Admin" },
                    { 2, "Bank manager", "Manager" },
                    { 3, "Bank employee", "Employee" },
                    { 4, "Bank customer", "Customer" }
                });

            migrationBuilder.InsertData(
                schema: "training",
                table: "User",
                columns: new[] { "UserId", "CreatedAt", "DateOfBirth", "DeletedAt", "Email", "PasswordHash", "Phone", "Status", "UpdatedAt", "UserType", "Username" },
                values: new object[,]
                {
                    { 1, new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, "admin@bank.com", "fXhWj2qkHZH4zUO6R8C5DJV8bErAAHjZClJrr5MFkds=", "9000000001", "active", null, "normal", "Admin User" },
                    { 2, new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, "manager@bank.com", "4R2OZzj3rA7SKtkE7CqMiqQzqM5aS+R5+tdX59CyI/A=", "9000000002", "active", null, "normal", "Manager User" },
                    { 3, new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, "employee@bank.com", "1zG9U5RJXZb2Q9eAV+y2B9IpcF3i0L2EDqxU53sE3wo=", "9000000003", "active", null, "normal", "Employee User" },
                    { 4, new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, "customer@bank.com", "jM2Dxke9QvVMB6HBIhH7jrqQlbG2AxEo8A6RCVYjW8E=", "9000000004", "active", null, "normal", "Customer User" }
                });

            migrationBuilder.InsertData(
                schema: "training",
                table: "UserRole",
                columns: new[] { "RoleId", "UserId" },
                values: new object[,]
                {
                    { 1, 1 },
                    { 2, 2 },
                    { 3, 3 },
                    { 4, 4 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Accounts_BranchId",
                schema: "training",
                table: "Accounts",
                column: "BranchId");

            migrationBuilder.CreateIndex(
                name: "IX_Accounts_UserId",
                schema: "training",
                table: "Accounts",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Branch_BankId",
                schema: "training",
                table: "Branch",
                column: "BankId");

            migrationBuilder.CreateIndex(
                name: "IX_employee_branchid",
                schema: "training",
                table: "employee",
                column: "branchid");

            migrationBuilder.CreateIndex(
                name: "IX_employee_roleid",
                schema: "training",
                table: "employee",
                column: "roleid");

            migrationBuilder.CreateIndex(
                name: "IX_employee_userid",
                schema: "training",
                table: "employee",
                column: "userid");

            migrationBuilder.CreateIndex(
                name: "IX_MinorGuardian_GuardianUserId",
                schema: "training",
                table: "MinorGuardian",
                column: "GuardianUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Poa_AccountId",
                schema: "training",
                table: "Poa",
                column: "AccountId");

            migrationBuilder.CreateIndex(
                name: "IX_Poa_GrantedToUserUserId",
                schema: "training",
                table: "Poa",
                column: "GrantedToUserUserId");

            migrationBuilder.CreateIndex(
                name: "IX_RolePermission_PermissionId",
                schema: "training",
                table: "RolePermission",
                column: "PermissionId");

            migrationBuilder.CreateIndex(
                name: "IX_TermDeposit_AccountId",
                schema: "training",
                table: "TermDeposit",
                column: "AccountId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_TermDeposit_LinkedAccountId",
                schema: "training",
                table: "TermDeposit",
                column: "LinkedAccountId");

            migrationBuilder.CreateIndex(
                name: "IX_Transaction_AccountId",
                schema: "training",
                table: "Transaction",
                column: "AccountId");

            migrationBuilder.CreateIndex(
                name: "IX_Transaction_ApprovedByEmployeeEmployeeId",
                schema: "training",
                table: "Transaction",
                column: "ApprovedByEmployeeEmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_Transaction_PerformedByUserUserId",
                schema: "training",
                table: "Transaction",
                column: "PerformedByUserUserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserRole_RoleId",
                schema: "training",
                table: "UserRole",
                column: "RoleId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MinorGuardian",
                schema: "training");

            migrationBuilder.DropTable(
                name: "Poa",
                schema: "training");

            migrationBuilder.DropTable(
                name: "RolePermission",
                schema: "training");

            migrationBuilder.DropTable(
                name: "TermDeposit",
                schema: "training");

            migrationBuilder.DropTable(
                name: "Transaction",
                schema: "training");

            migrationBuilder.DropTable(
                name: "UserRole",
                schema: "training");

            migrationBuilder.DropTable(
                name: "Permission",
                schema: "training");

            migrationBuilder.DropTable(
                name: "Accounts",
                schema: "training");

            migrationBuilder.DropTable(
                name: "employee",
                schema: "training");

            migrationBuilder.DropTable(
                name: "Branch",
                schema: "training");

            migrationBuilder.DropTable(
                name: "Role",
                schema: "training");

            migrationBuilder.DropTable(
                name: "User",
                schema: "training");

            migrationBuilder.DropTable(
                name: "Bank",
                schema: "training");
        }
    }
}
