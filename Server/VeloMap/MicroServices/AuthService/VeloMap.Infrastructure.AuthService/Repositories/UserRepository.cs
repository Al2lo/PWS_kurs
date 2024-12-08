using Microsoft.EntityFrameworkCore;
using VeloMap.Domain.AuthService.Data;
using VeloMap.Domain.AuthService.Data.Repositories.Interfaces;
using VeloMap.Domain.AuthService.Models;

namespace VeloMap.Infrastructure.AuthService.Repositories
{
    public class UserRepository : BaseRepository<User>, IUserRepository
    {
        public UserRepository(ApplicationContext context) : base(context) { }

        public async Task<User> GetByEmailAsync(string email, CancellationToken cancellationToken)
        {
            var user = await _table
                 .Include(u => u.RefreshToken)
                .FirstOrDefaultAsync(x => x.Email == email, cancellationToken);

            if (user == null)
                throw new Exception("invalid email!");

            return user;
        }
    }
}
