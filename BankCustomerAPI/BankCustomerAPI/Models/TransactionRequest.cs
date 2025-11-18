namespace BankCustomerAPI.Models
{
    public class TransactionRequest
    {
        public int AccountId { get; set; }
        public decimal Amount { get; set; }
        public string TransactionType { get; set; } = "";
        public string? Remarks { get; set; }
    }
}
