using Microsoft.Extensions.DependencyInjection;
using VeloMap.Domain.RouteService.Data.Repositories;
using VeloMap.Infrastructure.RouteService.Repositories;

namespace VeloMap.Infrastructure.RouteService.Extensions
{
    public static class DependencyInjections
    {
       public static IServiceCollection AddInfrastructure(this IServiceCollection service)
       {
            service
                .AddScoped<IRouteRepository, RouteRepository>()
                .AddScoped<IPointRepository, PointRepository>()
                .AddScoped<IFavoriteRouteRepository, FavoriteRouteRepository>()
                .AddScoped<ICommentRepository, CommentRepository>();

            return service;
       }
    }
}
