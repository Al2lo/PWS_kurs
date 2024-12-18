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

        public override async Task DeleteAsync(FavoriteRoute entity)
        {
            var route = _table.Where(x => x.UserId == entity.UserId && x.RouteId == entity.RouteId).First();
            await base.DeleteAsync(route);
        }

        public async Task<FavoriteRoute?> GetFavoriteRouteAsync(int routeId, int userId)
        {
            return await _table.Where(x => x.RouteId == routeId && x.UserId == userId).FirstOrDefaultAsync();
        }
    }
}
