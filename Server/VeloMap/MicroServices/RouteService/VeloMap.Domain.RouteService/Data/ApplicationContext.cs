using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VeloMap.Domain.RouteService.Configuration;
using VeloMap.Domain.RouteService.Models;

namespace VeloMap.Domain.RouteService.Data
{
    public class ApplicationContext : DbContext
    {
        public DbSet<Route> Routes { get; set; } = null!;
        public DbSet<Point> Points { get; set; } = null!;
        public DbSet<FavoriteRoute> FavoriteRoutes { get; set; } = null!;
        public DbSet<Comment> Comments { get; set; } = null!;
        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        { }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(CommentConfiguration).Assembly);
            base.OnModelCreating(modelBuilder);
        }
    }
}
