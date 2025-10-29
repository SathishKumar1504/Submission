using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BankCustomerAPI.Migrations
{
    /// <inheritdoc />
    public partial class CleanFix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Employee_Branch_BranchId",
                schema: "training",
                table: "Employee");

            migrationBuilder.DropForeignKey(
                name: "FK_Employee_Role_RoleId",
                schema: "training",
                table: "Employee");

            migrationBuilder.DropForeignKey(
                name: "FK_Employee_User_UserId",
                schema: "training",
                table: "Employee");

            migrationBuilder.DropForeignKey(
                name: "FK_Transaction_Employee_ApprovedByEmployeeEmployeeId",
                schema: "training",
                table: "Transaction");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Employee",
                schema: "training",
                table: "Employee");

            migrationBuilder.RenameTable(
                name: "Employee",
                schema: "training",
                newName: "employee",
                newSchema: "training");

            migrationBuilder.RenameColumn(
                name: "UserId",
                schema: "training",
                table: "employee",
                newName: "userid");

            migrationBuilder.RenameColumn(
                name: "UpdatedAt",
                schema: "training",
                table: "employee",
                newName: "updatedat");

            migrationBuilder.RenameColumn(
                name: "TerminatedAt",
                schema: "training",
                table: "employee",
                newName: "terminatedat");

            migrationBuilder.RenameColumn(
                name: "Status",
                schema: "training",
                table: "employee",
                newName: "status");

            migrationBuilder.RenameColumn(
                name: "Salary",
                schema: "training",
                table: "employee",
                newName: "salary");

            migrationBuilder.RenameColumn(
                name: "RoleId",
                schema: "training",
                table: "employee",
                newName: "roleid");

            migrationBuilder.RenameColumn(
                name: "HireDate",
                schema: "training",
                table: "employee",
                newName: "hiredate");

            migrationBuilder.RenameColumn(
                name: "EmployeeName",
                schema: "training",
                table: "employee",
                newName: "employeename");

            migrationBuilder.RenameColumn(
                name: "Designation",
                schema: "training",
                table: "employee",
                newName: "designation");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                schema: "training",
                table: "employee",
                newName: "createdat");

            migrationBuilder.RenameColumn(
                name: "BranchId",
                schema: "training",
                table: "employee",
                newName: "branchid");

            migrationBuilder.RenameColumn(
                name: "EmployeeId",
                schema: "training",
                table: "employee",
                newName: "employeeid");

            migrationBuilder.RenameIndex(
                name: "IX_Employee_UserId",
                schema: "training",
                table: "employee",
                newName: "IX_employee_userid");

            migrationBuilder.RenameIndex(
                name: "IX_Employee_RoleId",
                schema: "training",
                table: "employee",
                newName: "IX_employee_roleid");

            migrationBuilder.RenameIndex(
                name: "IX_Employee_BranchId",
                schema: "training",
                table: "employee",
                newName: "IX_employee_branchid");

            migrationBuilder.AlterColumn<string>(
                name: "status",
                schema: "training",
                table: "employee",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "employeename",
                schema: "training",
                table: "employee",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "designation",
                schema: "training",
                table: "employee",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_employee",
                schema: "training",
                table: "employee",
                column: "employeeid");

            migrationBuilder.AddForeignKey(
                name: "FK_employee_Branch_branchid",
                schema: "training",
                table: "employee",
                column: "branchid",
                principalSchema: "training",
                principalTable: "Branch",
                principalColumn: "BranchId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_employee_Role_roleid",
                schema: "training",
                table: "employee",
                column: "roleid",
                principalSchema: "training",
                principalTable: "Role",
                principalColumn: "RoleId");

            migrationBuilder.AddForeignKey(
                name: "FK_employee_User_userid",
                schema: "training",
                table: "employee",
                column: "userid",
                principalSchema: "training",
                principalTable: "User",
                principalColumn: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Transaction_employee_ApprovedByEmployeeEmployeeId",
                schema: "training",
                table: "Transaction",
                column: "ApprovedByEmployeeEmployeeId",
                principalSchema: "training",
                principalTable: "employee",
                principalColumn: "employeeid");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_employee_Branch_branchid",
                schema: "training",
                table: "employee");

            migrationBuilder.DropForeignKey(
                name: "FK_employee_Role_roleid",
                schema: "training",
                table: "employee");

            migrationBuilder.DropForeignKey(
                name: "FK_employee_User_userid",
                schema: "training",
                table: "employee");

            migrationBuilder.DropForeignKey(
                name: "FK_Transaction_employee_ApprovedByEmployeeEmployeeId",
                schema: "training",
                table: "Transaction");

            migrationBuilder.DropPrimaryKey(
                name: "PK_employee",
                schema: "training",
                table: "employee");

            migrationBuilder.RenameTable(
                name: "employee",
                schema: "training",
                newName: "Employee",
                newSchema: "training");

            migrationBuilder.RenameColumn(
                name: "userid",
                schema: "training",
                table: "Employee",
                newName: "UserId");

            migrationBuilder.RenameColumn(
                name: "updatedat",
                schema: "training",
                table: "Employee",
                newName: "UpdatedAt");

            migrationBuilder.RenameColumn(
                name: "terminatedat",
                schema: "training",
                table: "Employee",
                newName: "TerminatedAt");

            migrationBuilder.RenameColumn(
                name: "status",
                schema: "training",
                table: "Employee",
                newName: "Status");

            migrationBuilder.RenameColumn(
                name: "salary",
                schema: "training",
                table: "Employee",
                newName: "Salary");

            migrationBuilder.RenameColumn(
                name: "roleid",
                schema: "training",
                table: "Employee",
                newName: "RoleId");

            migrationBuilder.RenameColumn(
                name: "hiredate",
                schema: "training",
                table: "Employee",
                newName: "HireDate");

            migrationBuilder.RenameColumn(
                name: "employeename",
                schema: "training",
                table: "Employee",
                newName: "EmployeeName");

            migrationBuilder.RenameColumn(
                name: "designation",
                schema: "training",
                table: "Employee",
                newName: "Designation");

            migrationBuilder.RenameColumn(
                name: "createdat",
                schema: "training",
                table: "Employee",
                newName: "CreatedAt");

            migrationBuilder.RenameColumn(
                name: "branchid",
                schema: "training",
                table: "Employee",
                newName: "BranchId");

            migrationBuilder.RenameColumn(
                name: "employeeid",
                schema: "training",
                table: "Employee",
                newName: "EmployeeId");

            migrationBuilder.RenameIndex(
                name: "IX_employee_userid",
                schema: "training",
                table: "Employee",
                newName: "IX_Employee_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_employee_roleid",
                schema: "training",
                table: "Employee",
                newName: "IX_Employee_RoleId");

            migrationBuilder.RenameIndex(
                name: "IX_employee_branchid",
                schema: "training",
                table: "Employee",
                newName: "IX_Employee_BranchId");

            migrationBuilder.AlterColumn<string>(
                name: "Status",
                schema: "training",
                table: "Employee",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20);

            migrationBuilder.AlterColumn<string>(
                name: "EmployeeName",
                schema: "training",
                table: "Employee",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(100)",
                oldMaxLength: 100);

            migrationBuilder.AlterColumn<string>(
                name: "Designation",
                schema: "training",
                table: "Employee",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(100)",
                oldMaxLength: 100,
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Employee",
                schema: "training",
                table: "Employee",
                column: "EmployeeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Employee_Branch_BranchId",
                schema: "training",
                table: "Employee",
                column: "BranchId",
                principalSchema: "training",
                principalTable: "Branch",
                principalColumn: "BranchId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Employee_Role_RoleId",
                schema: "training",
                table: "Employee",
                column: "RoleId",
                principalSchema: "training",
                principalTable: "Role",
                principalColumn: "RoleId");

            migrationBuilder.AddForeignKey(
                name: "FK_Employee_User_UserId",
                schema: "training",
                table: "Employee",
                column: "UserId",
                principalSchema: "training",
                principalTable: "User",
                principalColumn: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Transaction_Employee_ApprovedByEmployeeEmployeeId",
                schema: "training",
                table: "Transaction",
                column: "ApprovedByEmployeeEmployeeId",
                principalSchema: "training",
                principalTable: "Employee",
                principalColumn: "EmployeeId");
        }
    }
}
