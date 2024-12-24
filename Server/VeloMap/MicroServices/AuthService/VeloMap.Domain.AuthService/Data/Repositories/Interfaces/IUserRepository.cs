using VeloMap.Domain.AuthService.Models;

namespace VeloMap.Domain.AuthService.Data.Repositories.Interfaces
{
    public interface IUserRepository : IBaseRepository<User>
    {
        Task<User?> GetByEmailAsync(string email, CancellationToken cancellationToken);
        Task<List<User>> GetAllUsersByAdminAsync();
        Task<bool> HaveAdminAsync();
        Task SaveChangesAsync();
    }
}
