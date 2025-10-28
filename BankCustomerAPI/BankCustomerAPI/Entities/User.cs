using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Principal;

namespace BankCustomerAPI.Entities
{
    [Table("User", Schema = "training")]
    public class User
    {
        public int UserId { get; set; }
        public string Name { get; set; } = "";
        public string Email { get; set; } = "";
        public string Password { get; set; } = "";
        public string? Phone { get; set; }
        public string UserType { get; set; } = "normal";
        public DateTime? DateOfBirth { get; set; }
        public string Status { get; set; } = "active";
        public DateTime Created_At { get; set; } = DateTime.Now;
        public DateTime? Updated_At { get; set; }
        public DateTime? Deleted_At { get; set; }

        public ICollection<UserRole>? UserRoles { get; set; }
        public ICollection<Account>? Accounts { get; set; }
    }
}
