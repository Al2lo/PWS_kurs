using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using VeloMap.Domain.RouteService.Models;

namespace VeloMap.Domain.RouteService.Configuration
{
    internal class PointConfiguration : IEntityTypeConfiguration<Point>
    {
        public void Configure(EntityTypeBuilder<Point> builder)
        {
            builder.ToTable("Points")
               .HasKey(x => x.Id);

            builder.Property(x => x.Id)
                .ValueGeneratedOnAdd();

            builder.Property(x => x.Latitude)
                .HasMaxLength(50)
                .IsRequired()
                .HasColumnType("varchar");

            builder.Property(x => x.Longitude)
                .HasMaxLength(50)
                .IsRequired()
                .HasColumnType("varchar");
        }
    }
}
