using System.ComponentModel.DataAnnotations.Schema;

namespace BankCustomerAPI.Entities
{
    [Table("Employee", Schema = "training")]
    public class Employee
    {
        public int EmployeeId { get; set; }

        public int? UserId { get; set; }
        public User? User { get; set; }

        public int BranchId { get; set; }
        public Branch? Branch { get; set; }

        public int? RoleId { get; set; }
        public Role? Role { get; set; }

        public string EmployeeName { get; set; } = string.Empty;
        public string? Designation { get; set; }
        public decimal? Salary { get; set; }

        public DateTime HireDate { get; set; } = DateTime.Now;
        public string Status { get; set; } = "active";

        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime? UpdatedAt { get; set; }
        public DateTime? TerminatedAt { get; set; }
    }
}
