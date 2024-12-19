using Microsoft.EntityFrameworkCore;
using VeloMap.Domain.EventService.Configuration;
using VeloMap.Domain.EventService.Models;

namespace VeloMap.Domain.EventService.Data
{
    public class ApplicationContext : DbContext
    {
        public DbSet<Event> Events { get; set; } = null!;
        public DbSet<EventUser> EventUsers { get; set; } = null!;
        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        { }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(EventConfiguration).Assembly);
            base.OnModelCreating(modelBuilder);
        }
    }
}
