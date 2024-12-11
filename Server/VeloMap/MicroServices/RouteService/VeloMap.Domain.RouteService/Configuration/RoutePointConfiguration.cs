using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using VeloMap.Domain.RouteService.Models;

namespace VeloMap.Domain.RouteService.Configuration
{
    internal class RoutePointConfiguration : IEntityTypeConfiguration<RoutePoint>
    {
        public void Configure(EntityTypeBuilder<RoutePoint> builder)
        {
            builder.ToTable("RoutePoints")
                .HasKey(x => x.Id);

            builder.Property(rp => rp.OrderIndex)
                .IsRequired()
                .HasColumnType("int");

            builder.HasOne(rp => rp.Route)
                .WithMany(r => r.RoutePoints) 
                .HasForeignKey(rp => rp.RouteId)  
                .OnDelete(DeleteBehavior.Cascade);


            builder.HasOne(rp => rp.Point) 
                .WithMany()
                .HasForeignKey(rp => rp.PoinId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
