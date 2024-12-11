using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using VeloMap.Domain.RouteService.Models;

namespace VeloMap.Domain.RouteService.Configuration
{
    internal class FavoriteRouteConfiguration : IEntityTypeConfiguration<FavoriteRoute>
    {
        public void Configure(EntityTypeBuilder<FavoriteRoute> builder)
        {
            builder.ToTable("FavoriteRoutes")
               .HasKey(x => x.Id);

            builder.Property(x => x.UserId)
                .IsRequired()
                .HasColumnType("int");

            builder.HasOne(fr => fr.Route)
                .WithMany(r => r.FavoriteRoutes)
                .HasForeignKey(fr => fr.RouteId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
