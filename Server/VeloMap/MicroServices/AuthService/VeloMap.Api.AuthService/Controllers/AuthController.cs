using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VeloMap.Application.AuthService.DTOs.UserDto;
using VeloMap.Application.AuthService.Services;
using VeloMap.Application.AuthService.Services.Interfaces;

namespace VeloMap.Api.AuthService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly ILogger<AuthController> _logger;
        private readonly IValidator<CreateUserDto> _createUserDTOValidator;
        private readonly IValidator<LoginUserDto> _loginUserDTOValidator;
        public AuthController(ILogger<AuthController> logger, IAuthService authService, IValidator<CreateUserDto> createUserDTOValidator, IValidator<LoginUserDto> loginUserDTOValidator)
        {
            _logger = logger;
            _authService = authService;
            _createUserDTOValidator = createUserDTOValidator;
            _loginUserDTOValidator = loginUserDTOValidator;
        }

        [HttpGet("login")]
        public async Task<IActionResult> Login([FromQuery] LoginUserDto loginUserDTO, CancellationToken cancellationToken)
        {
            var validationResult = _loginUserDTOValidator.Validate(loginUserDTO);

            if (!validationResult.IsValid)
                throw new Exception(validationResult.Errors.ToString());

            var tokens = await _authService.LoginAsync(loginUserDTO, cancellationToken);
            HttpContext.Response.Cookies.Append("access-token", tokens[0], new CookieOptions
            {
                HttpOnly = true,                
                Secure = true,                  
                SameSite = SameSiteMode.None,   
                Expires = DateTime.UtcNow.AddDays(7) 
            });

            HttpContext.Response.Cookies.Append("refresh-token", tokens[1], new CookieOptions
            {
                HttpOnly = true,                
                Secure = true,                  
                SameSite = SameSiteMode.None,   
                Expires = DateTime.UtcNow.AddDays(7)
            });

            return Ok(new { Name = tokens[2], Email = tokens[3], Role = int.Parse(tokens[4]), Id = int.Parse(tokens[5]) });
        }

        [HttpPost("users")]
        public async Task<IActionResult> Register([FromBody] CreateUserDto createUserDTO, CancellationToken cancellationToken)
        {
            var validationResult = _createUserDTOValidator.Validate(createUserDTO);

            if (!validationResult.IsValid)
                throw new Exception(validationResult.Errors.ToString());

            await _authService.RegisterAsync(createUserDTO, cancellationToken);

            return Ok();
        }

        [HttpGet("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Append("access-token", "", new CookieOptions
            {
                Expires = DateTimeOffset.UtcNow.AddDays(-1),
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None
            });

            Response.Cookies.Append("refresh-token", "", new CookieOptions
            {
                Expires = DateTimeOffset.UtcNow.AddDays(-1),
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None
            });

            return Ok(new { message = "Logged out successfully" });
        }


        [HttpGet("profile")]
        public async Task<IActionResult> ReloginAsync()
        {
            var userIdClaim = User?.FindFirst("userId");

            if (userIdClaim == null || string.IsNullOrEmpty(userIdClaim.Value))
            {
                return Unauthorized(new { message = "Token is not valid or missing!" });
            }

            if (!int.TryParse(userIdClaim.Value, out int userId))
            {
                return BadRequest(new { message = "Invalid userId in token!" });
            }

            var user = await _authService.ReloginAsync(userId);

            return Ok(user);
        }

        [HttpGet()]
        public async Task<IActionResult> GetUserName([FromQuery] int userId)
        {         
            var user = await _authService.GetUserNameAsync(userId);

            return Ok(user);
        }
    }
}
