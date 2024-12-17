using VeloMap.Application.RouteService.DTOs.PointDTO;

namespace VeloMap.Application.RouteService.DTOs.RouteDTO
{
    public class UpdateRotueDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Distance { get; set; }
        public DateTime CreateDate { get; set; }
        public bool IsPublic { get; set; }
        public int UserId { get; set; }
    }
}
