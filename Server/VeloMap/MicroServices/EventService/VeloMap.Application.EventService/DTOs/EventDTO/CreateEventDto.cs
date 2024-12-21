namespace VeloMap.Application.EventService.DTOs.EventDTO
{
    public class CreateEventDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public DateTime StartTime { get; set; }
        public int Capasity { get; set; }
    }
}
