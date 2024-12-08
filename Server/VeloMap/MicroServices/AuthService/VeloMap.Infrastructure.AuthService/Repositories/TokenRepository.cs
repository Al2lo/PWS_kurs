using VeloMap.Domain.AuthService.Data;
using VeloMap.Domain.AuthService.Data.Repositories.Interfaces;
using VeloMap.Domain.AuthService.Models;

namespace VeloMap.Infrastructure.AuthService.Repositories
{
    public class TokenRepository : BaseRepository<Token>, ITokenRepository
    {
        public TokenRepository(ApplicationContext context) : base(context) { }


    }
}
