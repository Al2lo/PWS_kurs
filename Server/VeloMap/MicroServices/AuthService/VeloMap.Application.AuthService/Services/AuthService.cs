using VeloMap.Application.AuthService.DTOs.UserDto;
using VeloMap.Application.AuthService.Helpers;
using VeloMap.Application.AuthService.Services.Interfaces;
using VeloMap.Domain.AuthService.Data.Repositories.Interfaces;
using VeloMap.Domain.AuthService.Enums;
using VeloMap.Domain.AuthService.Models;

namespace VeloMap.Application.AuthService.Services
{
    public class AuthService : IAuthService
    {
        private readonly ITokenService _tokenService;
        private readonly IUserRepository _userRepository;
        private readonly ITokenRepository _tokenRepository;

        public AuthService(IUserRepository userRepository, ITokenRepository tokenRepository, ITokenService tokenService)
        {
            _userRepository = userRepository;
            _tokenRepository = tokenRepository;
            _tokenService = tokenService;
        }
        public async Task<string[]> LoginAsync(LoginUserDto loginUserDTO, CancellationToken cancellationToken)
        {
            var user = await _userRepository.GetByEmailAsync(loginUserDTO.Email, cancellationToken);

            if (user == null)
                throw new Exception("Invalid Email!");

            if (!PasswordHasherHelper.Verify(loginUserDTO.Password + user.PasswordSalt, user.PasswordHash))
                throw new Exception("Invalid Password!");

            if (user.IsBlocked)
                throw new Exception("User is blocked by admin");

            var accessToken = _tokenService.GenerateAccessToken(user);
            var refreshToken = _tokenService.GenerateRefreshToken();

            user.RefreshToken.CreateDate = DateTime.Now;
            user.RefreshToken.RefreshToken = refreshToken;
            user.RefreshToken.ExpiresDate = DateTime.Now.AddDays(30);

            await _userRepository.UpdateAsync(user);


            return new string[] { accessToken, refreshToken, user.Name, user.Email, user.Role.ToString(), user.Id.ToString() };
        }

        public async Task RegisterAsync(CreateUserDto createUser, CancellationToken cancellationToken)
        {
            var user = await _userRepository.GetByEmailAsync(createUser.Email, cancellationToken);

            if (user != null)
                throw new Exception("This is email is used");

            var passwordSalt = new Random().Next(0, 100000000).ToString();
            var refreshToken = _tokenService.GenerateRefreshToken();
            var refrToken = new Token
            {
                CreateDate = DateTime.Now,
                RefreshToken = refreshToken,
                ExpiresDate = DateTime.Now.AddDays(30)
            };
            var newUser = new User()
            {
                Email = createUser.Email,
                Name = createUser.Name,
                PasswordSalt = passwordSalt,
                PasswordHash = PasswordHasherHelper.Generate(createUser.Password + passwordSalt),
                Role = (int)Role.User,
                IsBlocked = false,
                RefreshToken = refrToken
            };

            await _userRepository.AddAsync(newUser, cancellationToken);
        }

        public Task<bool> LogOutAsync(CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public async Task<UserDto> ReloginAsync(int userId)
        {
            var user = await _userRepository.GetByIdAsync(userId);

            if (user == null)
                throw new Exception();

            if (user.IsBlocked)
                throw new Exception("user is blocked by admin");

            var retUser = new UserDto()
            {
                Name = user.Name,
                Email = user.Email,
                Id = user.Id,
                Role = user.Role,
            };

            return retUser;
        }
    }
}