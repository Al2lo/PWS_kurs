using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using VeloMap.Application.EventService.Configuration;
using VeloMap.Application.EventService.Services;
using VeloMap.Application.EventService.Services.Interfaces;

namespace VeloMap.Application.EventService.Extensions
{ 
    public static class DependencyInjections
    {
        public static IServiceCollection AddApplication(this IServiceCollection services, IConfiguration configuration)
        {
            var jwtOptions = configuration.GetSection(nameof(JwtOption)).Get<JwtOption>();

            services.Configure<JwtOption>(configuration.GetSection("JwtOption"));

            services
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
                            context.Token = context.Request.Cookies["access-token"];
                            return Task.CompletedTask;
                        },
                        OnAuthenticationFailed = context =>
                        {
                            Console.WriteLine("Authentication failed: " + context.Exception.Message);
                            return Task.CompletedTask;
                        },
                        OnChallenge = context =>
                        {
                            Console.WriteLine("Unauthorized access");
                            return Task.CompletedTask;
                        }
                    };
                });

            services.AddScoped<IEventService, Services.EventService>();

            return services;
        }
    }
}
