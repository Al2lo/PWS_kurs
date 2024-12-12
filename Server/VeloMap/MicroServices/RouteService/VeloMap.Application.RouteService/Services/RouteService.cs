using VeloMap.Application.RouteService.DTOs.RouteDTO;
using VeloMap.Application.RouteService.Services.Interfaces;
using VeloMap.Domain.RouteService.Data.Repositories;
using VeloMap.Domain.RouteService.Models;

namespace VeloMap.Application.RouteService.Services
{
    public class RouteService : IRouteService
    {
        private readonly IRouteRepository _routeRepository;
        private readonly IPointRepository _pointRepository;
        private readonly IFavoriteRouteRepository _favoriteRouteRepository;

        public RouteService(IRouteRepository routeRepository, IPointRepository pointRepository, IFavoriteRouteRepository favoriteRouteRepository) 
        {
            _routeRepository = routeRepository;
            _pointRepository = pointRepository;
            _favoriteRouteRepository = favoriteRouteRepository;
        }

        public async Task<List<Route>> GetFavoriteRoutesAsync(int userId)
        {
            return (await _favoriteRouteRepository.GetByUserIdAsync(userId)).Select(x => x.Route).ToList();
        }

        public async Task<List<Route>> GetPublicRoutesAsync()
        {
            return await _routeRepository.GetPublicRoutesAsync();
        }

        public async Task<List<Route>> GetUserRoutes(int userId)
        {
            return await _routeRepository.GetUserRoutes(userId);
        }

        public async Task CreateRouteAsync(CreateRouteDTO createRoute, CancellationToken token)
        {
            var newRoute = new Route() {
                Title = createRoute.Title,
                Description = createRoute.Description,
                Distance = createRoute.Distance,
                CreateDate = createRoute.CreateDate,
                IsPublic = createRoute.IsPublic,
                UserId = createRoute.UserId,
                Rating = 0,
                Points = createRoute.Points.Select(x => new Point() { Latitude = x.Lat.ToString(), Longitude = x.Lon.ToString() }).ToList()
        };

            await _routeRepository.CreateRouteAsync(newRoute, token);
        }

    }
}
