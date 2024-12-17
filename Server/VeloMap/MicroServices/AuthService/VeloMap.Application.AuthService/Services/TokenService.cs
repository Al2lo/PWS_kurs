using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using VeloMap.Application.AuthService.Configurations;
using VeloMap.Application.AuthService.Services.Interfaces;
using VeloMap.Domain.AuthService.Models;

namespace VeloMap.Application.AuthService.Services
{
    public class TokenService : ITokenService
    {
        private readonly JwtOption _options;
        public TokenService(IOptions<JwtOption> options)
        {
            _options = options.Value;
        }
        public string GenerateAccessToken(User user)
        {
            Claim[] claims = { new("userId", user.Id.ToString()), new("Role", user.Role.ToString()) };
            var signingCredentials = new SigningCredentials(
                new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_options.SecretAccess)),
                SecurityAlgorithms.HmacSha256);

            var accessToken = new JwtSecurityToken(
                claims: claims,
                issuer: _options.Issuer,
                audience: _options.Audience,
                signingCredentials: signingCredentials,
                expires: DateTime.UtcNow.AddDays(_options.Expires));

            var tokenValue = new JwtSecurityTokenHandler().WriteToken(accessToken);

            return tokenValue;
        }

        public string GenerateRefreshToken()
        {
            var signingCredentials = new SigningCredentials(
                new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_options.SecretRefresh)),
                SecurityAlgorithms.HmacSha256);

            var refreshToken = new JwtSecurityToken(
                issuer: _options.Issuer,
                audience: _options.Audience,
                signingCredentials: signingCredentials,
                expires: DateTime.UtcNow.AddDays(_options.Expires));

            var tokenValue = new JwtSecurityTokenHandler().WriteToken(refreshToken);

            return tokenValue;
        }
    }
}
