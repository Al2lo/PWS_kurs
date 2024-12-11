namespace VeloMap.Domain.RouteService.Models
{
    public class RoutePoint
    {
        public int Id { get; set; }
        public int RouteId { get; set; }
        public Route Route { get; set; }
        public int PoinId { get; set; }
        public Point Point { get; set; }
        public int OrderIndex { get; set; }
    }
}
