using VeloMap.Domain.RouteService.Models;

namespace VeloMap.Application.RouteService.DTOs.CommentDTO
{
    public class CreateCommentDto
    {
        public string Text { get; set; }
        public int? ParentCommentId { get; set; }
        public int UserId { get; set; }
    }
}
