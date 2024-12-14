using VeloMap.Application.RouteService.DTOs.PointDTO;
using VeloMap.Domain.RouteService.Models;

namespace VeloMap.Application.RouteService.DTOs.RouteDTO
{
    public class RouteDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Distance { get; set; } = string.Empty;
        public DateTime CreateDate { get; set; }
        public bool IsPublic { get; set; }
        public int UserId { get; set; }
        public bool isLike { get; set; }
        public List<PointDto> Points { get; set; } = new List<PointDto>();
    }
}
