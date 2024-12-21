using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VeloMap.Application.AuthService.DTOs.UserDto;
using VeloMap.Application.AuthService.Services;
using VeloMap.Application.AuthService.Services.Interfaces;
using VeloMap.Domain.AuthService.Data.Repositories.Interfaces;

namespace VeloMap.Api.AuthService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IValidator<UpdateUserDto> _updateUserValidator;
        public UsersController(IUserService userService, IValidator<UpdateUserDto> updateUserValidator)
        {
            _userService = userService;
            _updateUserValidator = updateUserValidator;
        }

        [HttpGet()]
        public async Task<IActionResult> GetUserName([FromQuery] int userId)
        {
            var user = await _userService.GetUserNameAsync(userId);

            return Ok(user);
        }

        [Authorize]
        [HttpPut]
        public async Task<IActionResult> UdpdateAsync([FromBody] UpdateUserDto updateUserDto, CancellationToken cancellationToken)
        {
            var validationResult = _updateUserValidator.Validate(updateUserDto);

            if (!validationResult.IsValid)
                throw new Exception(validationResult.Errors[0].ErrorMessage);

            var userIdClaim = User?.FindFirst("userId");

            if (userIdClaim == null || string.IsNullOrEmpty(userIdClaim.Value))
            {
                return Unauthorized(new { message = "Token is not valid or missing!" });
            }

            if (!int.TryParse(userIdClaim.Value, out int userId))
            {
                return BadRequest(new { message = "Invalid userId in token!" });
            }

            await _userService.UpdateUserAsync(userId, updateUserDto, cancellationToken);

            return Ok();
        }
    }
}
