using VeloMap.Application.RouteService.DTOs.CommentDTO;
using VeloMap.Application.RouteService.Services.Interfaces;
using VeloMap.Domain.RouteService.Data.Repositories;
using VeloMap.Domain.RouteService.Models;

namespace VeloMap.Application.RouteService.Services
{
    public class CommentService : ICommentService
    {
        private readonly ICommentRepository _commentRepository;

        public CommentService(ICommentRepository commentRepository)
        {
            _commentRepository = commentRepository;
        }

        public async Task<List<Comment>> GetCommentsAsync(int routeId)
        {
            return await _commentRepository.GetCommentsAsync(routeId);
        }

        public async Task CreateCommentAsync(int routeId, CreateCommentDto createCommentDto, CancellationToken token)
        {
            var newComment = new Comment {
                RouteId = routeId,
                Text = createCommentDto.Text,
                ParentCommentId = createCommentDto.ParentCommentId,
                UserId = createCommentDto.UserId
            };

            await _commentRepository.AddAsync(newComment, token);
        }
    }
}
