using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BankCustomerAPI.Migrations
{
    /// <inheritdoc />
    public partial class UpdateSeedPasswords : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                schema: "training",
                table: "User",
                keyColumn: "UserId",
                keyValue: 1,
                column: "PasswordHash",
                value: "JAvlGPq9JyTdtvBO6x2llnRI1+gxwIyPqCKAn3THIKk=");

            migrationBuilder.UpdateData(
                schema: "training",
                table: "User",
                keyColumn: "UserId",
                keyValue: 2,
                column: "PasswordHash",
                value: "hmSFeWz6jXwM9xEWQCBbgwdkM1R1d1EdgfgDCumezqU=");

            migrationBuilder.UpdateData(
                schema: "training",
                table: "User",
                keyColumn: "UserId",
                keyValue: 3,
                column: "PasswordHash",
                value: "a5PMukFKwdCuHnfz+sVgx0imcB7WlGc1pJ1GM1FRjhY=");

            migrationBuilder.UpdateData(
                schema: "training",
                table: "User",
                keyColumn: "UserId",
                keyValue: 4,
                column: "PasswordHash",
                value: "sEHArrNbsPpKpmjKWpILWQGW/a+aAOuFLJt/TRI8xtY=");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                schema: "training",
                table: "User",
                keyColumn: "UserId",
                keyValue: 1,
                column: "PasswordHash",
                value: "fXhWj2qkHZH4zUO6R8C5DJV8bErAAHjZClJrr5MFkds=");

            migrationBuilder.UpdateData(
                schema: "training",
                table: "User",
                keyColumn: "UserId",
                keyValue: 2,
                column: "PasswordHash",
                value: "4R2OZzj3rA7SKtkE7CqMiqQzqM5aS+R5+tdX59CyI/A=");

            migrationBuilder.UpdateData(
                schema: "training",
                table: "User",
                keyColumn: "UserId",
                keyValue: 3,
                column: "PasswordHash",
                value: "1zG9U5RJXZb2Q9eAV+y2B9IpcF3i0L2EDqxU53sE3wo=");

            migrationBuilder.UpdateData(
                schema: "training",
                table: "User",
                keyColumn: "UserId",
                keyValue: 4,
                column: "PasswordHash",
                value: "jM2Dxke9QvVMB6HBIhH7jrqQlbG2AxEo8A6RCVYjW8E=");
        }
    }
}
