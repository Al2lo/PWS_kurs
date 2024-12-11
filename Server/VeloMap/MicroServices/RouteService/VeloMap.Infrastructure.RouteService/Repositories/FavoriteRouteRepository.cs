using VeloMap.Domain.RouteService.Data;
using VeloMap.Domain.RouteService.Data.Repositories;
using VeloMap.Domain.RouteService.Models;

namespace VeloMap.Infrastructure.RouteService.Repositories
{
    public class FavoriteRouteRepository : BaseRepository<FavoriteRoute>, IFavoriteRouteRepository
    {
        public FavoriteRouteRepository(ApplicationContext context) : base(context) { }
    }
}
