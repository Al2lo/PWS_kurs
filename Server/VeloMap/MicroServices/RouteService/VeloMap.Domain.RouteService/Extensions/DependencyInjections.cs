using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace VeloMap.Domain.RouteService.Extensions
{
    public static class DependencyInjections
    {
        public static IServiceCollection AddDomain(this IServiceCollection service, IConfiguration configuration)
        {
            return service;
        }
    }
}
