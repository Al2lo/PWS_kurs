namespace VeloMap.Domain.RouteService.Models
{
    public class FavoriteRoute
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int RouteId { get; set; }
        public Route Route { get; set; }
    }
}
