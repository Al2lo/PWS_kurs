
namespace VeloMap.Domain.AuthService.Models
{
    public class Token
    {
        public Guid Id { get; set; }
        public string RefreshToken { get; set; } = string.Empty;
        public DateTime CreateDate { get; set; }
        public DateTime ExpiresDate { get; set; }
        public User User { get; set; } = null!;
    }
}
