using VeloMap.Domain.RouteService.Data;
using VeloMap.Domain.RouteService.Data.Repositories;
using VeloMap.Domain.RouteService.Models;

namespace VeloMap.Infrastructure.RouteService.Repositories
{
    public class PointRepository : BaseRepository<Point>, IPointRepository
    {
        public PointRepository(ApplicationContext context) : base(context) { }
    }
}
