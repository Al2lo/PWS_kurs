namespace VeloMap.Domain.EventService.Models
{
    public class Event
    {
        public int Id { get; set; } 
        public string Title { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public DateTime StartTime { get; set; }
        public int OwnerId { get; set; }
        public int Capasity { get; set; }
        public bool IsAccepted { get; set; }
        public ICollection<EventUser> EventUsers { get; set; }
    }
}
