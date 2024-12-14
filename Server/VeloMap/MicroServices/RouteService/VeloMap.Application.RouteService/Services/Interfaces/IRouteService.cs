using VeloMap.Application.RouteService.DTOs.RouteDTO;
using VeloMap.Domain.RouteService.Models;

namespace VeloMap.Application.RouteService.Services.Interfaces
{
    public interface IRouteService
    {
        Task<List<Route>> GetFavoriteRoutesAsync(int userId);
        Task<List<Route>> GetPublicRoutesAsync();
        Task<List<Route>> GetUserRoutesAsync(int userId);
        Task<RouteDto> GetRouteAsync(int id, int userId);
        Task CreateRouteAsync(CreateRouteDto createRoute, CancellationToken token);
        Task UpdateRouteAsync(CreateRouteDto updateRoute);


    }
}
