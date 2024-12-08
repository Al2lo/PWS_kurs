namespace VeloMap.Application.AuthService.DTOs.UserDto
{
    public class CreateUserDto
    {
        public string Name { get; init; } = string.Empty;
        public string Email { get; init; } = string.Empty;
        public string Password { get; init; } = string.Empty;
    }
}
