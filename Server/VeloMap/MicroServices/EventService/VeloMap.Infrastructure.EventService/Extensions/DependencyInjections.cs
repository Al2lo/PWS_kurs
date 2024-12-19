using Microsoft.Extensions.DependencyInjection;
using VeloMap.Domain.EventService.Data.Repositories;
using VeloMap.Infrastructure.EventService.Repositories;

namespace VeloMap.Infrastructure.EventService.Extensions
{
    public static class DependencyInjections
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services)
        {
            services
                .AddScoped<IEventRepository, EventRepository>()
                .AddScoped<IEventUserRepository, EventUserRepository>();

            return services;
        }
    }
}
