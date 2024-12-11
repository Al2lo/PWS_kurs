using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using VeloMap.Domain.RouteService.Models;

namespace VeloMap.Domain.RouteService.Configuration
{
    internal class PointConfiguration : IEntityTypeConfiguration<Point>
    {
        public void Configure(EntityTypeBuilder<Point> builder)
        {

        }
    }
}
