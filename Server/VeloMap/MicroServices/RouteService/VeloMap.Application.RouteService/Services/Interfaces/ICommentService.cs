using VeloMap.Application.RouteService.DTOs.CommentDTO;
using VeloMap.Domain.RouteService.Models;

namespace VeloMap.Application.RouteService.Services.Interfaces
{
    public interface ICommentService
    {
        Task<List<Comment>> GetCommentsAsync(int routeId);
        Task CreateCommentAsync(int routeId, CreateCommentDto createCommentDto, CancellationToken token);
    }
}
