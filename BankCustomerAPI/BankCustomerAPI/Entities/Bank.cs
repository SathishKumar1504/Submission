using System.ComponentModel.DataAnnotations.Schema;

namespace BankCustomerAPI.Entities
{
    [Table("Bank", Schema = "training")]
    public class Bank
    {
        public int BankId { get; set; }
        public string BankName { get; set; } = string.Empty;
        public string? Address { get; set; }

        // Navigation
        public ICollection<Branch>? Branches { get; set; }
    }
}
