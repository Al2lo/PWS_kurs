using Microsoft.EntityFrameworkCore;
using VeloMap.Domain.EventService.Data;
using VeloMap.Domain.EventService.Data.Repositories;
using VeloMap.Domain.EventService.Models;

namespace VeloMap.Infrastructure.EventService.Repositories
{
    public class EventRepository : BaseRepository<Event>, IEventRepository
    {
        public EventRepository(ApplicationContext context) : base(context) { }

        public async Task<List<Event>> GetOpenedeEventsAsync()
        {
            return await _table
                .Where(x => x.IsAccepted == true)
                .Include(x => x.EventUsers)
                .ToListAsync();
        }
    }
}
