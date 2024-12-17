using VeloMap.Application.AuthService.DTOs.UserDto;

namespace VeloMap.Application.AuthService.Services.Interfaces
{
    public interface IAuthService
    {
        Task<string[]> LoginAsync(LoginUserDto loginUserDTO, CancellationToken cancellationToken);
        Task RegisterAsync(CreateUserDto createUser, CancellationToken cancellationToken);
        Task<bool> LogOutAsync(CancellationToken cancellationToken);
        Task<UserDto> ReloginAsync(int userId);
    }
}
