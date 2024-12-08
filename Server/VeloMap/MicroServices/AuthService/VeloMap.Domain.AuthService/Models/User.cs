namespace VeloMap.Domain.AuthService.Models;
public class User
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = String.Empty;
    public string PasswordHash { get; set; } = String.Empty;
    public string PasswordSalt { get; set; } = String.Empty;
    public int Role { get; set; }
    public Token? RefreshToken { get; set; }
    public Guid RefreshTokenId { get; set; }
    public bool IsBlocked { get; set; }
}
