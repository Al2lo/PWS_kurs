using VeloMap.Domain.EventService.Data;
using VeloMap.Domain.EventService.Data.Repositories;
using VeloMap.Domain.EventService.Models;

namespace VeloMap.Infrastructure.EventService.Repositories
{
    public class EventUserRepository : BaseRepository<EventUser>, IEventUserRepository
    {
        public EventUserRepository(ApplicationContext context) : base(context) { }
    }
}
