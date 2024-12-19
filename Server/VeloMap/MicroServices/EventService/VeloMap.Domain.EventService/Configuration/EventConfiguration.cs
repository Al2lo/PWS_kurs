using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using VeloMap.Domain.EventService.Models;

namespace VeloMap.Domain.EventService.Configuration
{
    public class EventConfiguration : IEntityTypeConfiguration<Event>
    {
        public void Configure(EntityTypeBuilder<Event> builder)
        {
            builder.ToTable("Events")
                .HasKey(e => e.Id);

            builder.Property(e => e.Title)
                .IsRequired()
                .HasMaxLength(255);

            builder.Property(e => e.Description)
                .HasMaxLength(1000);

            builder.Property(e => e.Location)
                .HasMaxLength(500);

            builder.HasMany(e => e.EventUsers)
                .WithOne(eu => eu.Event)
                .HasForeignKey(eu => eu.EventId);
        }
    }
}
