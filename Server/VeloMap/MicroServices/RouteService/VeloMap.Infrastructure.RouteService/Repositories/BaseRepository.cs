using Microsoft.EntityFrameworkCore;
using VeloMap.Domain.RouteService.Data.Repositories;

namespace VeloMap.Infrastructure.RouteService.Repositories
{
    public class BaseRepository<T> : IBaseRepository<T> where T : class
    {
        private readonly DbContext _context;
        public readonly DbSet<T> _table;

        public BaseRepository(DbContext context)
        {
            _context = context;
            _table = this._context.Set<T>();
        }

        public async Task AddAsync(T entity, CancellationToken token)
        {
            await _table.AddAsync(entity, token);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(T entity)
        {
            _table.Remove(entity);
            await _context.SaveChangesAsync();
        }

        public async Task<List<T>> GetAllAsync()
        {
            return await _table.AsNoTracking().ToListAsync<T>();
        }

        public virtual async Task<T> GetByIdAsync(int id)
        {
            var item = await _table.FindAsync(id);

            if (item == null)
                throw new Exception("Element not found");

            return item;
        }

        public async Task UpdateAsync(T entity)
        {
            _table.Update(entity);
            await _context.SaveChangesAsync();
        }
    }
}
