using System.ComponentModel.DataAnnotations.Schema;

namespace BankCustomerAPI.Entities
{
    [Table("Branch", Schema = "training")]
    public class Branch
    {
        public int BranchId { get; set; }
        public string BranchName { get; set; } = string.Empty;
        public string? Address { get; set; }

        // Foreign key to Bank
        public int BankId { get; set; }
        public Bank? Bank { get; set; }

        // Navigation
        public ICollection<Account>? Accounts { get; set; }
    }
}
