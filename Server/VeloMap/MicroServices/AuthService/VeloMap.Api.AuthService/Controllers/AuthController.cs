using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VeloMap.Application.AuthService.DTOs.UserDto;
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

            HttpContext.Response.Cookies.Append("access-token", tokens[0]);
            HttpContext.Response.Cookies.Append("refresh-token", tokens[1]);

            return Ok(new { Name = tokens[2], Email = tokens[3], Role = tokens[4] });
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
    }
}
