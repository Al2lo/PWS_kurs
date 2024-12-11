namespace VeloMap.Domain.RouteService.Data.Repositories
{
    public interface IBaseRepository<T>
    {
        Task<List<T>> GetAllAsync();
        Task<T> GetByIdAsync(int id);
        Task AddAsync(T entity, CancellationToken token);
        Task UpdateAsync(T entity);
        Task DeleteAsync(T entity);
    }
}
