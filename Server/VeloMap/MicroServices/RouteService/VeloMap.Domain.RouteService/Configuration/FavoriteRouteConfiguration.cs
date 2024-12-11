using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using VeloMap.Domain.RouteService.Models;

namespace VeloMap.Domain.RouteService.Configuration
{
    internal class FavoriteRouteConfiguration : IEntityTypeConfiguration<FavoriteRoute>
    {
        public void Configure(EntityTypeBuilder<FavoriteRoute> builder)
        {

        }
    }
}
