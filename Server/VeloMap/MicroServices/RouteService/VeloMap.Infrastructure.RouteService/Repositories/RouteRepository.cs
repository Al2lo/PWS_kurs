﻿using Microsoft.EntityFrameworkCore;
using VeloMap.Domain.RouteService.Data;
using VeloMap.Domain.RouteService.Data.Repositories;
using VeloMap.Domain.RouteService.Models;

namespace VeloMap.Infrastructure.RouteService.Repositories
{
    public class RouteRepository : BaseRepository<Route>, IRouteRepository
    {
        public RouteRepository(ApplicationContext context) : base(context) { }

        public async Task<List<Route>> GetPublicRoutesAsync()
        {
            return await _table.Where(x => x.IsPublic).ToListAsync();
        }

        public async Task<List<Route>> GetUserRoutes(int userId)
        {
            return await _table.Where(x => x.UserId == userId).ToListAsync();
        }

        public async Task CreateRouteAsync(Route route, CancellationToken token)
        {
            await AddAsync(route, token);
        }

        public override async Task<Route> GetByIdAsync(int id)
        {
            var item = await _table
                .Include(x => x.Points)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (item == null)
                throw new Exception("Element not found");

            return item;
        }
    }
}
