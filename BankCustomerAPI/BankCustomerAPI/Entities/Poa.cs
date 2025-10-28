using System.ComponentModel.DataAnnotations.Schema;

namespace BankCustomerAPI.Entities
{
    [Table("Poa", Schema = "training")]
    public class Poa
    {
        public int PoaId { get; set; }

        public int AccountId { get; set; }
        public Account? Account { get; set; }

        public int GrantedTo { get; set; }
        public User? GrantedToUser { get; set; }

        public DateTime ValidFrom { get; set; } = DateTime.Now;
        public DateTime? ValidTo { get; set; }

        public string Status { get; set; } = "active";

        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime? RevokedAt { get; set; }
    }
}
