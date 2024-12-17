using VeloMap.Domain.AuthService.Extensions;
using VeloMap.Infrastructure.AuthService.Extensions;
using VeloMap.Application.AuthService.Extensions;
using VeloMap.Api.AuthService.Middleware;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services
            .AddDomain(builder.Configuration)
            .AddInfrastructure()
            .AddApplication(builder.Configuration);


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

var app = builder.Build();

app.UseCors();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseMiddleware<ExceptionHandler>();

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
