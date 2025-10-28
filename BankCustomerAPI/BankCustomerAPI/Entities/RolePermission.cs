using System.ComponentModel.DataAnnotations.Schema;

namespace BankCustomerAPI.Entities
{
    [Table("RolePermission", Schema = "training")]
    public class RolePermission
    {
        public int RoleId { get; set; }
        public int PermissionId { get; set; }

        // Navigation
        public Role? Role { get; set; }
        public Permission? Permission { get; set; }
    }
}
