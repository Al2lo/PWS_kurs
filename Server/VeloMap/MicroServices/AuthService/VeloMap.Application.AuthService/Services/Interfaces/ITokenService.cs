using VeloMap.Domain.AuthService.Models;

namespace VeloMap.Application.AuthService.Services.Interfaces
{
    public interface ITokenService
    {
        public string GenerateAccessToken(User user);
        public string GenerateRefreshToken();
    }
}
