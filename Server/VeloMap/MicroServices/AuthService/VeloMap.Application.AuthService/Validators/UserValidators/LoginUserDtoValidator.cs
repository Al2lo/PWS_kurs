using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VeloMap.Application.AuthService.DTOs.UserDto;

namespace VeloMap.Application.AuthService.Validators.UserValidators
{
    internal class LoginUserDtoValidator : AbstractValidator<LoginUserDto>
    {
        public LoginUserDtoValidator()
        {
            RuleFor(x => x.Email)
               .NotEmpty()
               .EmailAddress()
               .WithMessage("Incorrect email!");

            RuleFor(x => x.Password).NotEmpty()
                .MinimumLength(8)
                .Matches(@"[A-Z]+")
                .Matches(@"[a-z]+")
                .Matches(@"[0-9]+")
                .WithMessage("Incorrect password!");
        }
    }
}
