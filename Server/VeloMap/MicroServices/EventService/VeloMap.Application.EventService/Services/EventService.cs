using VeloMap.Application.EventService.Services.Interfaces;
using VeloMap.Domain.EventService.Data.Repositories;

namespace VeloMap.Application.EventService.Services
{
    public class EventService : IEventService
    {
        public readonly IEventRepository _eventRepository;
        public readonly IEventUserRepository _eventUserRepository;

        public EventService(IEventRepository eventRepository, IEventUserRepository eventUserRepository)
        {
            _eventRepository = eventRepository;
            _eventUserRepository = eventUserRepository;
        }

    }
}
