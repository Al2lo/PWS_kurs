using FluentValidation;
using VeloMap.Application.AuthService.DTOs.UserDto;

namespace VeloMap.Application.AuthService.Validators.UserValidators
{
    internal class CreateUserDtoValidator : AbstractValidator<CreateUserDto>
    {
        public CreateUserDtoValidator()
        {
            RuleFor(x => x.Password).NotEmpty()
                .MinimumLength(8)
                .Matches(@"[A-Z]+")
                .Matches(@"[a-z]+")
                .Matches(@"[0-9]+")
                .WithMessage("Incorrect password!");

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
