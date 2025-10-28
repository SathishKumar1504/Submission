using System.ComponentModel.DataAnnotations.Schema;

namespace BankCustomerAPI.Entities
{
    [Table("MinorGuardian", Schema = "training")]
    public class MinorGuardian
    {
        public int GuardianId { get; set; }

        public int MinorUserId { get; set; }
        public User? MinorUser { get; set; }

        public int GuardianUserId { get; set; }
        public User? GuardianUser { get; set; }

        public string? Relation { get; set; }

        public DateTime AssignedAt { get; set; } = DateTime.Now;
        public DateTime? UpdatedAt { get; set; }
    }
}
