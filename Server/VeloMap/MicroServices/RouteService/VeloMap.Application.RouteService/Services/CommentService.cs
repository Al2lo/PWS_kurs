using VeloMap.Application.RouteService.Services.Interfaces;
using VeloMap.Domain.RouteService.Data.Repositories;

namespace VeloMap.Application.RouteService.Services
{
    public class CommentService : ICommentService
    {
        private readonly ICommentRepository _commentRepository;

        public CommentService(ICommentRepository commentRepository)
        {
            _commentRepository = commentRepository;
        }
    }
}
