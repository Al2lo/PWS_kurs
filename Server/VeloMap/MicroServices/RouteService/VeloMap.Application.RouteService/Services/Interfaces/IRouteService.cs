using VeloMap.Application.RouteService.DTOs.FavoriteRouteDTO;
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
        Task<int> CreateRouteAsync(CreateRouteDto createRoute, CancellationToken token);
        Task UpdateRouteAsync(CreateRouteDto updateRoute);
        Task CreateFovoriteRouteAsync(CreateFavoriteRouteDto createFavoriteRouteDto, CancellationToken token);
        Task DeleteFovoriteRouteAsync(CreateFavoriteRouteDto createFavoriteRouteDto);

    }
}
