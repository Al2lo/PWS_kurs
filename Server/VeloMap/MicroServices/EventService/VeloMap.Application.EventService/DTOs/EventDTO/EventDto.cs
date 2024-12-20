using VeloMap.Domain.EventService.Models;

namespace VeloMap.Application.EventService.DTOs.EventDTO
{
    public class EventDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public DateTime StartTime { get; set; }
        public int OwnerId { get; set; }
        public int Capasity { get; set; }
        public int Count { get; set; }
        public bool Participant { get; set; }
    }
}
