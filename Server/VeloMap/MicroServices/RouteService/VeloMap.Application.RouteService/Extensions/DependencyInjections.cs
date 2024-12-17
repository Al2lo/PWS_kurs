using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using VeloMap.Application.RouteService.Configuration;
using VeloMap.Application.RouteService.Services;
using VeloMap.Application.RouteService.Services.Interfaces;

namespace VeloMap.Application.RouteService.Extensions
{
    public static class DependencyInjections
    {
        public static IServiceCollection AddApplication(this IServiceCollection service, IConfiguration configuration)
        {
            service
                .AddScoped<IRouteService, Services.RouteService>()
                .AddScoped<ICommentService, CommentService>();


            var jwtOptions = configuration.GetSection(nameof(JwtOption)).Get<JwtOption>();

            service.Configure<JwtOption>(configuration.GetSection("JwtOption"));

            service
                .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtOptions.SecretAccess)),
                        ValidIssuer = jwtOptions.Issuer,
                        ValidAudience = jwtOptions.Audience
                    };

                    options.Events = new JwtBearerEvents
                    {
                        OnMessageReceived = context =>
                        {
                            // Забираем токен из cookie
                            context.Token = context.Request.Cookies["access-token"];
                            return Task.CompletedTask;
                        },
                        OnAuthenticationFailed = context =>
                        {
                            // Выводим сообщение, если аутентификация не удалась
                            Console.WriteLine("Authentication failed: " + context.Exception.Message);
                            return Task.CompletedTask;
                        },
                        OnChallenge = context =>
                        {
                            // Выводим сообщение, если пользователь не авторизован
                            Console.WriteLine("Unauthorized access");
                            return Task.CompletedTask;
                        }
                    };
                });

            return service;
        }
    }
}
