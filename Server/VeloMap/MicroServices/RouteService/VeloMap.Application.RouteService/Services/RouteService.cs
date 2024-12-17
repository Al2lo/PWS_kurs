using VeloMap.Application.RouteService.DTOs.FavoriteRouteDTO;
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

        public async Task<int> CreateRouteAsync(CreateRouteDto createRoute, CancellationToken token)
        {
            if (createRoute.Points.Count == 0)
                throw new Exception("Address can not be empty");

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

            var routeId = await _routeRepository.GetRouteIdAsync(newRoute);

            return routeId;
        }

        public async Task UpdateRouteAsync(UpdateRotueDto updateRoute)
        {
            var route = await _routeRepository.GetByIdAsync(updateRoute.Id);
            route.Description = updateRoute.Description;
            route.Title = updateRoute.Title;
            route.IsPublic = updateRoute.IsPublic;

            await _routeRepository.SaveChangesAsync();
        }

        public async Task CreateFovoriteRouteAsync(CreateFavoriteRouteDto createFavoriteRouteDto, CancellationToken token)
        {
            var newFavoriteRoute = new FavoriteRoute()
            {
                UserId = createFavoriteRouteDto.UserId,
                RouteId = createFavoriteRouteDto.RouteId,
            };

            await _favoriteRouteRepository.AddAsync(newFavoriteRoute, token);
        }

        public async Task DeleteFovoriteRouteAsync(CreateFavoriteRouteDto createFavoriteRouteDto)
        {
            var newFavoriteRoute = new FavoriteRoute()
            {
                UserId = createFavoriteRouteDto.UserId,
                RouteId = createFavoriteRouteDto.RouteId,
            };

            await _favoriteRouteRepository.DeleteAsync(newFavoriteRoute);
        }

        public async Task DeleteRouteAsync(int routeId, int userId)
        {
            var route = await _routeRepository.GetByIdAsync(routeId);

            if (route == null)
                throw new Exception("Route can not be null");

            var checkRoute = (await _routeRepository.GetUserRoutes(userId)).Where(route => route.Id == routeId).FirstOrDefault();

            if (checkRoute == default(Route))
                throw new Exception("Route is not assigned to this user");

            await _routeRepository.DeleteAsync(route);
        }
    }
}
