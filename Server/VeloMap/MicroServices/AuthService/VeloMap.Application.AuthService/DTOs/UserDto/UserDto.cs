using VeloMap.Domain.AuthService.Models;

namespace VeloMap.Application.AuthService.DTOs.UserDto
{
    public class UserDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = String.Empty;
        public int Role { get; set; }
    }
}
