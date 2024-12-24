# См. статью по ссылке https://aka.ms/customizecontainer, чтобы узнать как настроить контейнер отладки и как Visual Studio использует этот Dockerfile для создания образов для ускорения отладки.

# Этот этап используется при запуске из VS в быстром режиме (по умолчанию для конфигурации отладки)
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 5079 7001
ENV DOTNET_URLS=http://+:5079


# Этот этап используется для сборки проекта службы
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["EventService/VeloMap.Api.EventService/VeloMap.Api.EventService.csproj", "EventService/VeloMap.Api.EventService/"]
COPY ["EventService/VeloMap.Application.EventService/VeloMap.Application.EventService.csproj", "EventService/VeloMap.Application.EventService/"]
COPY ["EventService/VeloMap.Infrastructure.EventService/VeloMap.Infrastructure.EventService.csproj", "EventService/VeloMap.Infrastructure.EventService/"]
COPY ["EventService/VeloMap.Domain.EventService/VeloMap.Domain.EventService.csproj", "EventService/VeloMap.Domain.EventService/"]
RUN dotnet restore "./EventService/VeloMap.Api.EventService/VeloMap.Api.EventService.csproj"
COPY . .
WORKDIR "/src/EventService/VeloMap.Api.EventService"
RUN dotnet build "./VeloMap.Api.EventService.csproj" -c $BUILD_CONFIGURATION -o /app/build

# Этот этап используется для публикации проекта службы, который будет скопирован на последний этап
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./VeloMap.Api.EventService.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# Этот этап используется в рабочей среде или при запуске из VS в обычном режиме (по умолчанию, когда конфигурация отладки не используется)
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "VeloMap.Api.EventService.dll"]