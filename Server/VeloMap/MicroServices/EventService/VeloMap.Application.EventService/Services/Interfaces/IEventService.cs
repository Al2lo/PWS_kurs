using VeloMap.Application.EventService.DTOs.EventDTO;

namespace VeloMap.Application.EventService.Services.Interfaces
{
    public interface IEventService
    {
        Task<List<EventDto>> GetOpenedEventsAsync(int userId);
        Task RegisterUserAsync(int userId, int eventId, CancellationToken token);
        Task CheckoutUserAsync(int userId, int eventId, CancellationToken token);
    }
}
