using System.ComponentModel.DataAnnotations.Schema;
using System.Xml.Serialization;

namespace BankCustomerAPI.Entities
{
    [Table("Accounts", Schema= "training")]
    public class Account
    {
        public int AccountId { get; set; }
        public string AccountNumber { get; set; } = string.Empty;
        public string AccountType { get; set; } = "saving"; // saving | current | termdeposit
        public decimal Balance { get; set; } = 0;
        public string Currency { get; set; } = "INR";
        public bool IsMinor { get; set; } = false;
        public bool IsPOA { get; set; } = false;
        public string Status { get; set; } = "active";

        // Foreign Keys
        public int UserId { get; set; }
        public User? User { get; set; }

        public int BranchId { get; set; }
        public Branch? Branch { get; set; }

        // Dates
        public DateTime CreatedDate { get; set; } = DateTime.Now;
        public DateTime? LastTransactionDate { get; set; }
        public DateTime? ClosedDate { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime? UpdatedAt { get; set; }

        // Navigation
        public ICollection<Transaction>? Transactions { get; set; }
        public TermDeposit? TermDeposit { get; set; }
    }
}
