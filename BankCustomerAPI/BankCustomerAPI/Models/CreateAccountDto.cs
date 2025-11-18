namespace BankCustomerAPI.Models
{
    public class CreateAccountDto
    {
        public string AccountType { get; set; } = "saving";
        public int BranchId { get; set; }
        public decimal InitialDeposit { get; set; } = 0;
    }
}
