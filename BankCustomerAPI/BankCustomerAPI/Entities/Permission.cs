using System.ComponentModel.DataAnnotations.Schema;

namespace BankCustomerAPI.Entities
{
    [Table("Permission", Schema = "training")]
    public class Permission
    {
        public int PermissionId { get; set; }
        public string PermissionName { get; set; } = string.Empty;

        // Navigation
        public ICollection<RolePermission>? RolePermissions { get; set; }
    }
}
