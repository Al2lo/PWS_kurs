using VeloMap.Domain.RouteService.Data;
using VeloMap.Domain.RouteService.Data.Repositories;
using VeloMap.Domain.RouteService.Models;

namespace VeloMap.Infrastructure.RouteService.Repositories
{
    internal class RoutePointRepository : BaseRepository<RoutePoint>, IRoutePointRepository
    {
        public RoutePointRepository(ApplicationContext context) : base(context) { }
    }
}
