using VeloMap.Domain.RouteService.Models;

namespace VeloMap.Domain.RouteService.Data.Repositories
{
    public interface IFavoriteRouteRepository : IBaseRepository<FavoriteRoute>
    {
        Task<List<FavoriteRoute>> GetByUserIdAsync(int userId);
    }
}
