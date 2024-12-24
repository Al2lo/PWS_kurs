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
        // ��������� ������ origin, ������� ����� ���������� � ������ API
        policy.WithOrigins("http://localhost:5173")  // ��������� ������ � ������ ���������
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();  // ��������� ������� ������ (cookies)
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
