using VeloMap.Domain.RouteService.Models;

namespace VeloMap.Domain.RouteService.Data.Repositories
{
    public interface IRouteRepository: IBaseRepository<Route>
    {
        Task<List<Route>> GetPublicRoutesAsync();
        Task<List<Route>> GetUserRoutes(int userId);

        Task CreateRouteAsync(Route route, CancellationToken token);

        Task<int> GetRouteIdAsync(Route route);
    }
}
