using VeloMap.Application.AuthService.DTOs.UserDto;
using VeloMap.Application.AuthService.Services.Interfaces;
using VeloMap.Domain.AuthService.Data.Repositories.Interfaces;
using VeloMap.Domain.AuthService.Models;

namespace VeloMap.Application.AuthService.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        public UserService(IUserRepository userRepository) 
        {
            _userRepository = userRepository;
        }
        public async Task<string> GetUserNameAsync(int userId)
        {
            var user = await _userRepository.GetByIdAsync(userId);

            if (user == null)
                throw new Exception("User not found");

            return user.Name;
        }

        public async Task UpdateUserAsync(int userId, UpdateUserDto updateUserDto, CancellationToken token)
        {
            var user = await _userRepository.GetByIdAsync(userId);

            if (user.Email != updateUserDto.Email)
            {
                var existingUser = await _userRepository.GetByEmailAsync(updateUserDto.Email, token);

                if (existingUser != null)
                    throw new Exception("Email is used");
            }

            user.Name = updateUserDto.Name;
            user.Email = updateUserDto.Email;

            await _userRepository.SaveChangesAsync();
        }

        public async Task BlockUserAsync(int userId)
        {
            var user = await _userRepository.GetByIdAsync(userId);

            if (user == null)
                throw new Exception("User not found");

            user.IsBlocked = true;
            await _userRepository.SaveChangesAsync();
        }

        public async Task UnBlockUserAsync(int userId)
        {
            var user = await _userRepository.GetByIdAsync(userId);

            if (user == null)
                throw new Exception("User not found");

            user.IsBlocked = false;
            await _userRepository.SaveChangesAsync();
        }

        public async Task DeleteUserAsync(int userId)
        {
            var user = await _userRepository.GetByIdAsync(userId);

            if (user == null)
                throw new Exception("User not found");

            await _userRepository.DeleteAsync(user);
        }

        public async Task<List<AdminUserDto>> GetAllUsersAsync()
        {
            var users = await _userRepository.GetAllUsersByAdminAsync();

            var retUsers = users.Select(x => new AdminUserDto()
            {
                Id = x.Id,
                Name = x.Name,
                Email = x.Email,
                IsBlock = x.IsBlocked
            }).ToList();

            return retUsers;
        }
    }
}
