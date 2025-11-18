namespace BankCustomerAPI.Services
{
    public interface IJwtTokenService
    {
        string GenerateToken(string email, string role, string username);
        string GenerateRefreshToken();
    }
}
