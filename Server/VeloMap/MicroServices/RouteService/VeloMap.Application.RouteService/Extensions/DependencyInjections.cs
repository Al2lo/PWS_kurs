using Microsoft.Extensions.DependencyInjection;

namespace VeloMap.Application.RouteService.Extensions
{
    public static class DependencyInjections
    {
        public static IServiceCollection AddApplication(this IServiceCollection service)
        {
            return service;
        }
    }
}
