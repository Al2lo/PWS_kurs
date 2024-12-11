using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using VeloMap.Domain.RouteService.Models;

namespace VeloMap.Domain.RouteService.Configuration
{
    internal class RouteConfiguration : IEntityTypeConfiguration<Route>
    {
        public void Configure(EntityTypeBuilder<Route> builder)
        {

        }
    }
}
