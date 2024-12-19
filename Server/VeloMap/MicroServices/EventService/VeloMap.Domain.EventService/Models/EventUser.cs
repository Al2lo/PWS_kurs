namespace VeloMap.Domain.EventService.Models
{
    public class EventUser
    {
        public int EventId { get; set; }
        public Event Event { get; set; }
        public int UserId { get; set; }
    }
}
