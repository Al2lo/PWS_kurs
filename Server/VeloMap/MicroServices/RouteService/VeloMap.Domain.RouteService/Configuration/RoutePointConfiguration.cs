using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using VeloMap.Domain.RouteService.Models;

namespace VeloMap.Domain.RouteService.Configuration
{
    internal class RoutePointConfiguration : IEntityTypeConfiguration<RoutePoint>
    {
        public void Configure(EntityTypeBuilder<RoutePoint> builder)
        {

        }
    }
}
