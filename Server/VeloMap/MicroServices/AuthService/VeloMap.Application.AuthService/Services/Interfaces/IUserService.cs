using System.Threading.Tasks;
using VeloMap.Application.AuthService.DTOs.UserDto;

namespace VeloMap.Application.AuthService.Services.Interfaces
{
    public interface IUserService
    {
        Task<string> GetUserNameAsync(int userId);
        Task UpdateUserAsync(int userId, UpdateUserDto updateUserDto, CancellationToken token);
        Task BlockUserAsync(int userId);
        Task UnBlockUserAsync(int userId);
        Task DeleteUserAsync(int userId);
        Task<List<AdminUserDto>> GetAllUsersAsync();
    }
}
