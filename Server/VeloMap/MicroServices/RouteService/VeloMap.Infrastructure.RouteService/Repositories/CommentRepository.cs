using Microsoft.EntityFrameworkCore;
using VeloMap.Domain.RouteService.Data;
using VeloMap.Domain.RouteService.Data.Repositories;
using VeloMap.Domain.RouteService.Models;

namespace VeloMap.Infrastructure.RouteService.Repositories
{
    public class CommentRepository : BaseRepository<Comment>, ICommentRepository
    {
        public CommentRepository(ApplicationContext context) : base(context) { }

        public async Task<List<Comment>> GetCommentsAsync(int routeId)
        {
            var comments = await _table
                .Include(x => x.ChildComments)
                .Where(x => x.RouteId == routeId)
                .ToListAsync();

            return comments.Where(x => x.ParentCommentId == null).ToList();
            
        }
    }
}
