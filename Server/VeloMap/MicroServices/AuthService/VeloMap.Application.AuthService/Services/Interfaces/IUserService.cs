using VeloMap.Application.AuthService.DTOs.UserDto;

namespace VeloMap.Application.AuthService.Services.Interfaces
{
    public interface IUserService
    {
        Task<string> GetUserNameAsync(int userId);
        Task UpdateUserAsync(int userId, UpdateUserDto updateUserDto, CancellationToken token);
    }
}
