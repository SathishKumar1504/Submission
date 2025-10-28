using System.ComponentModel.DataAnnotations.Schema;

namespace BankCustomerAPI.Entities
{
    [Table("UserRole", Schema = "training")]
    public class UserRole
    {
        public int UserId { get; set; }
        public int RoleId { get; set; }

        // Navigation
        public User? User { get; set; }
        public Role? Role { get; set; }
    }
}
