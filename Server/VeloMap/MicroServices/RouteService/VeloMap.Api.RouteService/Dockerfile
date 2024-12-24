# См. статью по ссылке https://aka.ms/customizecontainer, чтобы узнать как настроить контейнер отладки и как Visual Studio использует этот Dockerfile для создания образов для ускорения отладки.

# Этот этап используется при запуске из VS в быстром режиме (по умолчанию для конфигурации отладки)
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 5131 7001
ENV DOTNET_URLS=http://+:5131


# Этот этап используется для сборки проекта службы
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["RouteService/VeloMap.Api.RouteService/VeloMap.Api.RouteService.csproj", "RouteService/VeloMap.Api.RouteService/"]
COPY ["RouteService/VeloMap.Application.RouteService/VeloMap.Application.RouteService.csproj", "RouteService/VeloMap.Application.RouteService/"]
COPY ["RouteService/VeloMap.Domain.RouteService/VeloMap.Domain.RouteService.csproj", "RouteService/VeloMap.Domain.RouteService/"]
COPY ["RouteService/VeloMap.Infrastructure.RouteService/VeloMap.Infrastructure.RouteService.csproj", "RouteService/VeloMap.Infrastructure.RouteService/"]
RUN dotnet restore "./RouteService/VeloMap.Api.RouteService/VeloMap.Api.RouteService.csproj"
COPY . .
WORKDIR "/src/RouteService/VeloMap.Api.RouteService"
RUN dotnet build "./VeloMap.Api.RouteService.csproj" -c $BUILD_CONFIGURATION -o /app/build

# Этот этап используется для публикации проекта службы, который будет скопирован на последний этап
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./VeloMap.Api.RouteService.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# Этот этап используется в рабочей среде или при запуске из VS в обычном режиме (по умолчанию, когда конфигурация отладки не используется)
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "VeloMap.Api.RouteService.dll"]