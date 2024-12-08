using Microsoft.Extensions.DependencyInjection;
using VeloMap.Domain.AuthService.Data.Repositories.Interfaces;
using VeloMap.Domain.AuthService.Models;
using VeloMap.Infrastructure.AuthService.Repositories;

namespace VeloMap.Infrastructure.AuthService.Extensions;
public static class DependencyInjections
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services)
    {
        services
            .AddScoped<IUserRepository, UserRepository>()
            .AddScoped<ITokenRepository, TokenRepository>();

        return services;
    }
}
