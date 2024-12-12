using VeloMap.Application.RouteService.DTOs.RouteDTO;
using VeloMap.Domain.RouteService.Models;

namespace VeloMap.Application.RouteService.Services.Interfaces
{
    public interface IRouteService
    {
        Task<List<Route>> GetFavoriteRoutesAsync(int userId);
        Task<List<Route>> GetPublicRoutesAsync();
        Task<List<Route>> GetUserRoutes(int userId);
        Task CreateRouteAsync(CreateRouteDTO createRoute, CancellationToken token);
    }
}
