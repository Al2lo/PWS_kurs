using Microsoft.EntityFrameworkCore;
using VeloMap.Domain.EventService.Data;
using VeloMap.Domain.EventService.Data.Repositories;
using VeloMap.Domain.EventService.Models;

namespace VeloMap.Infrastructure.EventService.Repositories
{
    public class EventUserRepository : BaseRepository<EventUser>, IEventUserRepository
    {
        public EventUserRepository(ApplicationContext context) : base(context) { }

        public async Task<EventUser?> GetUserEventAsync(int userId, int eventId)
        {
            return await _table.Where(x => x.UserId == userId && x.EventId == eventId).FirstOrDefaultAsync();
        }
    }
}
