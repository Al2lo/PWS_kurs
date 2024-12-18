namespace VeloMap.Domain.RouteService.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public int? ParentCommentId { get; set; } 
        public Comment ParentComment { get; set; }
        public int RouteId { get; set; }
        public Route Route { get; set; }

        public int UserId { get; set; }

        public ICollection<Comment> ChildComments { get; set; } = new List<Comment>();
    }
}
