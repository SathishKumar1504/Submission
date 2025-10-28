using System.ComponentModel.DataAnnotations.Schema;

namespace BankCustomerAPI.Entities
{
    [Table("TermDeposit", Schema = "training")]
    public class TermDeposit
    {
        public int TermDepositId { get; set; }
        public int AccountId { get; set; }
        public Account? Account { get; set; }

        public decimal PrincipalAmount { get; set; }
        public decimal InterestRate { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime MaturityDate { get; set; }
        public DateTime? ClosedDate { get; set; }

        // Linked Account (for maturity credit)
        public int? LinkedAccountId { get; set; }
        public Account? LinkedAccount { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime? UpdatedAt { get; set; }
    }
}
