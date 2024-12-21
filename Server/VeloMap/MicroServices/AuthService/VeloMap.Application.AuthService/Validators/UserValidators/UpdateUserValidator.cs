using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VeloMap.Application.AuthService.DTOs.UserDto;

namespace VeloMap.Application.AuthService.Validators.UserValidators
{
    internal class UpdateUserValidator : AbstractValidator<UpdateUserDto>
    {
        public UpdateUserValidator()
        {
            RuleFor(x => x.Email)
                .NotEmpty()
                .EmailAddress()
                .WithMessage("Incorrect email!");

            RuleFor(x => x.Name)
                .NotEmpty()
                .MaximumLength(10);
        }
    }
}
