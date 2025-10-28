using System.ComponentModel.DataAnnotations.Schema;

namespace BankCustomerAPI.Entities
{
    [Table("Role", Schema = "training")]
    public class Role
    {
        public int RoleId { get; set; }
        public string RoleName { get; set; } = string.Empty;

        // Navigation
        public ICollection<UserRole>? UserRoles { get; set; }
        public ICollection<RolePermission>? RolePermissions { get; set; }
    }
}
