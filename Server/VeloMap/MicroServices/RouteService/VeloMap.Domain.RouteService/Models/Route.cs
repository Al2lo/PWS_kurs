namespace VeloMap.Domain.RouteService.Models
{
    public class Route
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Distance { get; set; } = string.Empty;
        public DateTime CreateDate { get; set; }    
        public bool IsPublic { get; set; }
        public float Rating { get; set; }
        public int UserId { get; set; }

        public ICollection<Point> Points { get; set; } = new List<Point>();
        public ICollection<FavoriteRoute> FavoriteRoutes { get; set; } = new List<FavoriteRoute>();
        public ICollection<Comment> Comments { get; set; } = new List<Comment>();

    }
}
