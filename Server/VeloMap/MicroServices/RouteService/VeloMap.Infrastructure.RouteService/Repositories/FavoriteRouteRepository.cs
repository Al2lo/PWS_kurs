using Microsoft.EntityFrameworkCore;
using VeloMap.Domain.RouteService.Data;
using VeloMap.Domain.RouteService.Data.Repositories;
using VeloMap.Domain.RouteService.Models;

namespace VeloMap.Infrastructure.RouteService.Repositories
{
    public class FavoriteRouteRepository : BaseRepository<FavoriteRoute>, IFavoriteRouteRepository
    {
        public FavoriteRouteRepository(ApplicationContext context) : base(context) { }

        public async Task<List<FavoriteRoute>> GetByUserIdAsync(int userId)
        {
            return await _table.Include(x => x.Route).Where(x => x.UserId == userId).ToListAsync();
        }
    }
}
