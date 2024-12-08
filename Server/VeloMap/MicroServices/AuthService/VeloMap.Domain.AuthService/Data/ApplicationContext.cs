using Microsoft.EntityFrameworkCore;
using VeloMap.Domain.AuthService.Configurations;
using VeloMap.Domain.AuthService.Models;

namespace VeloMap.Domain.AuthService.Data
{
    public class ApplicationContext : DbContext
    {
        public DbSet<User> Users { get; set; } = null!;
        public DbSet<Token> Tokens { get; set; } = null!;
        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        { }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(UserConfiguration).Assembly);
            base.OnModelCreating(modelBuilder);
        }
    }
}
