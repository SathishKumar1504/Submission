using System.ComponentModel.DataAnnotations.Schema;

namespace BankCustomerAPI.Entities
{
    [Table("User", Schema = "training")]
    public class User
    {
        public int UserId { get; set; }

        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;

        public string? Phone { get; set; }
        //public string UserType { get; set; } = "normal";
        public string UserType { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string Status { get; set; } = "active";

        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime? UpdatedAt { get; set; }
        public DateTime? DeletedAt { get; set; }

        // Relationships
        public ICollection<UserRole>? UserRoles { get; set; }
        public ICollection<Account>? Accounts { get; set; }
    }
}
