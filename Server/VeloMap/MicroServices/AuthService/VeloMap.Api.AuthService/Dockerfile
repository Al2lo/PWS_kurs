# См. статью по ссылке https://aka.ms/customizecontainer, чтобы узнать как настроить контейнер отладки и как Visual Studio использует этот Dockerfile для создания образов для ускорения отладки.

# Этот этап используется при запуске из VS в быстром режиме (по умолчанию для конфигурации отладки)
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 5042 7001
ENV DOTNET_URLS=http://+:5042


# Этот этап используется для сборки проекта службы
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["AuthService/VeloMap.Api.AuthService/VeloMap.Api.AuthService.csproj", "AuthService/VeloMap.Api.AuthService/"]
COPY ["AuthService/VeloMap.Application.AuthService/VeloMap.Application.AuthService.csproj", "AuthService/VeloMap.Application.AuthService/"]
COPY ["AuthService/VeloMap.Domain.AuthService/VeloMap.Domain.AuthService.csproj", "AuthService/VeloMap.Domain.AuthService/"]
COPY ["AuthService/VeloMap.Infrastructure.AuthService/VeloMap.Infrastructure.AuthService.csproj", "AuthService/VeloMap.Infrastructure.AuthService/"]
RUN dotnet restore "./AuthService/VeloMap.Api.AuthService/VeloMap.Api.AuthService.csproj"
COPY . .
WORKDIR "/src/AuthService/VeloMap.Api.AuthService"
RUN dotnet build "./VeloMap.Api.AuthService.csproj" -c $BUILD_CONFIGURATION -o /app/build

# Этот этап используется для публикации проекта службы, который будет скопирован на последний этап
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./VeloMap.Api.AuthService.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# Этот этап используется в рабочей среде или при запуске из VS в обычном режиме (по умолчанию, когда конфигурация отладки не используется)
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "VeloMap.Api.AuthService.dll"]