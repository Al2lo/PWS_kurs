using System.Threading.Tasks;
using VeloMap.Domain.EventService.Models;

namespace VeloMap.Domain.EventService.Data.Repositories
{
    public interface IEventRepository : IBaseRepository<Event>
    {
        Task<List<Event>> GetOpenedeEventsAsync();
    }
}
