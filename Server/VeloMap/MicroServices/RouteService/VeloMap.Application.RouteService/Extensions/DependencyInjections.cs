using Microsoft.Extensions.DependencyInjection;
using VeloMap.Application.RouteService.Services;
using VeloMap.Application.RouteService.Services.Interfaces;

namespace VeloMap.Application.RouteService.Extensions
{
    public static class DependencyInjections
    {
        public static IServiceCollection AddApplication(this IServiceCollection service)
        {
            service
                .AddScoped<IRouteService, Services.RouteService>()
                .AddScoped<ICommentService, CommentService>();

            return service;
        }
    }
}
