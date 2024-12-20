using VeloMap.Domain.EventService.Models;

namespace VeloMap.Domain.EventService.Data.Repositories
{
    public interface IEventUserRepository : IBaseRepository<EventUser>
    {
        Task<EventUser?> GetUserEventAsync(int userId, int eventId);
    }
}
