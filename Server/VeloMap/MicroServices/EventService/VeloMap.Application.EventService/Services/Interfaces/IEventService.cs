using VeloMap.Application.EventService.DTOs.EventDTO;

namespace VeloMap.Application.EventService.Services.Interfaces
{
    public interface IEventService
    {
        Task<List<OpenedEventDto>> GetOpenedEventsAsync(int userId);
        Task<List<EventDto>> GetAllEventsAsync();
        Task RegisterUserAsync(int userId, int eventId, CancellationToken token);
        Task CheckoutUserAsync(int userId, int eventId, CancellationToken token);
        Task CreateEventAsync(int userId, CreateEventDto createEventDto, CancellationToken token);
        Task<List<EventDto>> GetEvetnsByUserAsync(int userId);
        Task DeleteAsync(int eventId);
        Task UpdateEventAsync(int eventId);
    }
}
