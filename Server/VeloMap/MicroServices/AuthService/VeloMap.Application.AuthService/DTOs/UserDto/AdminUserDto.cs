namespace VeloMap.Application.AuthService.DTOs.UserDto
{
    public class AdminUserDto
    {
        public int Id { get; set; }
        public string Name {get; set;}
        public string Email {get; set;}
        public bool IsBlock { get; set;}
    }
}
