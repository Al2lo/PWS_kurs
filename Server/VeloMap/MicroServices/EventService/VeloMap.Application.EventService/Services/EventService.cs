using Microsoft.AspNetCore.Mvc;
using VeloMap.Application.EventService.DTOs.EventDTO;
using VeloMap.Application.EventService.Services.Interfaces;
using VeloMap.Domain.EventService.Data.Repositories;
using VeloMap.Domain.EventService.Models;
using VeloMap.Infrastructure.EventService.Repositories;

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

        public async Task<List<EventDto>> GetOpenedEventsAsync(int userId)
        {
            var events = await _eventRepository.GetOpenedeEventsAsync();
            var outputEvents = new List<EventDto>();

            foreach (var item in events)
            {
                var participant = await GetUserHasEvent(userId, item.Id);
                outputEvents.Add(new EventDto
                {
                    Id = item.Id,
                    Title = item.Title,
                    Description = item.Description,
                    Location = item.Location,
                    StartTime = item.StartTime,
                    OwnerId = item.OwnerId,
                    Capasity = item.Capasity,
                    Count = item.EventUsers.Count,
                    Participant = participant
                });
            }

            return outputEvents;
        }

        public async Task RegisterUserAsync(int userId, int eventId, CancellationToken token)
        {
            var eventUser = new EventUser()
            {
                UserId = userId,
                EventId = eventId
            };

            await _eventUserRepository.AddAsync(eventUser, token);
        }

        public async Task CheckoutUserAsync(int userId, int eventId, CancellationToken token)
        {
            var eventUser = await _eventUserRepository.GetUserEventAsync(userId, eventId);

            if (eventUser == null)
                throw new Exception("User has not this event");

            await _eventUserRepository.DeleteAsync(eventUser);
        }

        public async Task<bool> GetUserHasEvent(int userId, int eventId)
        {
            var userEvent = await _eventUserRepository.GetUserEventAsync(userId, eventId);
            
            return userEvent != null;
        }
    }
}
