using Microsoft.Extensions.DependencyInjection;

namespace VeloMap.Infrastructure.RouteService.Extensions
{
    public static class DependencyInjections
    {
       public static IServiceCollection AddInfrastructure(this IServiceCollection service)
       {
            return service;
       }
    }
}
