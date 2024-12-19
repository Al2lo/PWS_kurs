using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using VeloMap.Domain.EventService.Models;

namespace VeloMap.Domain.EventService.Configuration
{
    public class EventUserConfiguration : IEntityTypeConfiguration<EventUser>
    {
        public void Configure(EntityTypeBuilder<EventUser> builder)
        {
            builder.ToTable("EventUsers")
                .HasKey(eu => new { eu.EventId, eu.UserId });

            builder.HasOne(eu => eu.Event)
                .WithMany(e => e.EventUsers)
                .HasForeignKey(eu => eu.EventId);
        }
    }
}
