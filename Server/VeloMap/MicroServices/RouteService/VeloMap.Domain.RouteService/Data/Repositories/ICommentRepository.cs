using VeloMap.Domain.RouteService.Models;

namespace VeloMap.Domain.RouteService.Data.Repositories
{
    public interface ICommentRepository : IBaseRepository<Comment>
    {
        Task<List<Comment>> GetCommentsAsync(int routeId);
    }
}
