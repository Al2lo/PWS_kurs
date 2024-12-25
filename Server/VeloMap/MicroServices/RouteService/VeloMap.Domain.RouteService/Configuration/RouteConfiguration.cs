using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using VeloMap.Domain.RouteService.Models;

namespace VeloMap.Domain.RouteService.Configuration
{
    internal class RouteConfiguration : IEntityTypeConfiguration<Route>
    {
        public void Configure(EntityTypeBuilder<Route> builder)
        {
            builder.ToTable("Routes")
              .HasKey(x => x.Id);

            builder.Property(x => x.Id)
                .ValueGeneratedOnAdd();

            builder.Property(x => x.Title)
                .HasMaxLength(50)
                .IsRequired()
                .HasColumnType("varchar");

            builder.Property(x => x.Description)
                .HasMaxLength(1000)
                .IsRequired()
                .HasColumnType("varchar");

            builder.Property(x => x.Distance)
                .HasMaxLength(20)
                .IsRequired()
                .HasColumnType("varchar");

            builder.Property(x => x.CreateDate)
                .HasColumnType("datetime")
                .HasDefaultValueSql("GETDATE()")
                .IsRequired();

            builder.Property(r => r.IsPublic)
                .IsRequired();

            builder.Property(x => x.Rating)
                .IsRequired()
                .HasColumnType("decimal(18,2)");

            builder.Property(x => x.UserId)
                .IsRequired()
                .HasColumnType("int");

            builder.HasMany(r => r.Points)
                .WithMany(rp => rp.Routes)
                .UsingEntity(j => j.ToTable("RoutePoints"));

            builder.HasMany(r => r.FavoriteRoutes)
                .WithOne(fr => fr.Route)
                .HasForeignKey(fr => fr.RouteId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(r => r.Comments)
                .WithOne(rp => rp.Route)
                .HasForeignKey(rp => rp.RouteId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
