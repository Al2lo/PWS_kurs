namespace VeloMap.Domain.RouteService.Models
{
    public class Point
    {
        public int Id { get; set; }
        public string Latitude { get; set; } = string.Empty;
        public string Longitude { get; set; } = string.Empty;

        public ICollection<Route> Routes { get; set; } = new List<Route>();
    }
}
