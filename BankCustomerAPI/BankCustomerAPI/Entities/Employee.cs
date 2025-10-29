using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankCustomerAPI.Entities
{
    [Table("employee", Schema = "training")]
    public class Employee
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("employeeid")]
        public int EmployeeId { get; set; }

        [Column("userid")]
        public int? UserId { get; set; }

        [ForeignKey(nameof(UserId))]
        public User? User { get; set; }

        [Column("branchid")]
        public int BranchId { get; set; }

        [ForeignKey(nameof(BranchId))]
        public Branch? Branch { get; set; }

        [Column("roleid")]
        public int? RoleId { get; set; }

        [ForeignKey(nameof(RoleId))]
        public Role? Role { get; set; }

        [Required]
        [MaxLength(100)]
        [Column("employeename")]
        public string EmployeeName { get; set; } = string.Empty;

        [MaxLength(100)]
        [Column("designation")]
        public string? Designation { get; set; }

        [Column("salary", TypeName = "decimal(18,2)")]
        public decimal? Salary { get; set; }

        [Column("hiredate")]
        public DateTime HireDate { get; set; } = DateTime.Now;

        [MaxLength(20)]
        [Column("status")]
        public string Status { get; set; } = "active";

        [Column("createdat")]
        public DateTime CreatedAt { get; set; } = DateTime.Now;

        [Column("updatedat")]
        public DateTime? UpdatedAt { get; set; }

        [Column("terminatedat")]
        public DateTime? TerminatedAt { get; set; }
    }
}
