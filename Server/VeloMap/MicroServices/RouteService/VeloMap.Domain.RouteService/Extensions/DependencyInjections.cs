using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using VeloMap.Domain.RouteService.Data;

namespace VeloMap.Domain.RouteService.Extensions
{
    public static class DependencyInjections
    {
        public static IServiceCollection AddDomain(this IServiceCollection service, IConfiguration configuration)
        {
            var connectionConfiguration = configuration.GetConnectionString("DefaultConnection");
            service.AddDbContext<ApplicationContext>(options =>
            {
                options.UseSqlServer(connectionConfiguration);
            });

            return service;
        }
    }
}
