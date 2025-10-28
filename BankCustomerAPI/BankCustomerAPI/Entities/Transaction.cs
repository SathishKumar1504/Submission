using System.ComponentModel.DataAnnotations.Schema;

namespace BankCustomerAPI.Entities
{
    [Table("Transaction", Schema = "training")]
    public class Transaction
    {
        public int TransactionId { get; set; }

        public int AccountId { get; set; }
        public Account? Account { get; set; }

        public string TransactionType { get; set; } = string.Empty; // deposit | withdraw
        public decimal Amount { get; set; }
        public DateTime TransDate { get; set; } = DateTime.Now;

        // Performed by (User)
        public int? PerformedBy { get; set; }
        public User? PerformedByUser { get; set; }

        // Approved by (Employee)
        public int? ApprovedBy { get; set; }
        public Employee? ApprovedByEmployee { get; set; }

        public string? Remarks { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime? UpdatedAt { get; set; }
    }
}
