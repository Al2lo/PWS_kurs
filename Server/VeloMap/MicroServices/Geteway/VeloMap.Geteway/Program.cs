using Ocelot.DependencyInjection;
using Ocelot.Middleware;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        // Указываем точный origin, который может обращаться к вашему API
        policy.WithOrigins("http://localhost:5173")  // Разрешаем доступ с вашего фронтенда
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();  // Разрешаем учетные данные (cookies)
    });
});

builder.Configuration.AddJsonFile("ocelot.json", optional: false, reloadOnChange: true);
builder.Services.AddOcelot();

var app = builder.Build();

app.UseCors();


app.UseAuthorization();

app.MapControllers();

await app.UseOcelot();

app.Run();
