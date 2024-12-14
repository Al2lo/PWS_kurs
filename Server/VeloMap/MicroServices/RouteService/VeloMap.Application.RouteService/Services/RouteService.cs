using VeloMap.Application.RouteService.DTOs.PointDTO;
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

        public async Task<List<Route>> GetUserRoutesAsync(int userId)
        {
            return await _routeRepository.GetUserRoutes(userId);
        }

        public async Task<RouteDto> GetRouteAsync(int id, int userId)
        {
            var route = await _routeRepository.GetByIdAsync(id);
            var isLike = (await GetFavoriteRoutesAsync(userId)).Where(x => x.Id == route.Id).ToList().Count == 0 ? false : true;
            var routeDto = new RouteDto()
            {
                Id = route.Id,
                Title = route.Title,
                Description = route.Description,
                CreateDate = route.CreateDate,
                Distance = route.Distance,
                IsPublic = route.IsPublic,
                UserId = route.UserId,
                isLike = isLike,
                Points = route.Points.Select(p => new PointDto
                {
                    Lat = p.Latitude,
                    Lon = p.Longitude
                }).ToList()
            };

            return routeDto;
        }

        public async Task CreateRouteAsync(CreateRouteDto createRoute, CancellationToken token)
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

        public async Task UpdateRouteAsync(CreateRouteDto updateRoute)
        {
            var newRoute = new Route()
            {
                Title = updateRoute.Title,
                Description = updateRoute.Description,
                Distance = updateRoute.Distance,
                CreateDate = updateRoute.CreateDate,
                IsPublic = updateRoute.IsPublic,
                UserId = updateRoute.UserId,
                Rating = 0,
                Points = updateRoute.Points.Select(x => new Point() { Latitude = x.Lat.ToString(), Longitude = x.Lon.ToString() }).ToList()
            };

            await _routeRepository.UpdateAsync(newRoute);
        }

    }
}
