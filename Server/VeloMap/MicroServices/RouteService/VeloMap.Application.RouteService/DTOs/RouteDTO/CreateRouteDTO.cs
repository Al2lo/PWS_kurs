namespace VeloMap.Application.RouteService.DTOs.RouteDTO
{
    public class CreateRouteDTO
    {
        public string? Title { get; init; }
        public string? Description { get; init; }
        public string? Distance { get; init; }
        public DateTime CreateDate { get; init; }
        public bool IsPublic { get; init; }
        public int UserId { get; init; }
        public List<CreatePointDto> Points { get; init; }
    }
}
