using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using VeloMap.Domain.AuthService.Models;

namespace VeloMap.Domain.AuthService.Configurations
{
    internal class UserConfiguration
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.ToTable("Users")
                .HasKey(x => x.Id);

            builder.Property(x => x.Id)
                .ValueGeneratedOnAdd();

            builder.Property(x => x.Name)
                .HasMaxLength(200)
                .IsRequired()
                .HasColumnType("varchar");

            builder.Property(x => x.Email)
                .HasColumnType("varchar")
                .IsRequired();

            builder.Property(x => x.PasswordHash)
                .HasColumnType("varchar")
                .IsRequired();

            builder.Property(x => x.PasswordSalt)
                .HasColumnType("varchar")
                .IsRequired();

            builder.Property(x => x.Role)
                .HasColumnType("int")
                .IsRequired();

            builder.HasOne(u => u.RefreshToken)
                .WithOne(t => t.User)
                .HasForeignKey<User>(u => u.RefreshTokenId);

            builder.Property(x => x.IsBlocked)
                .HasColumnType("boolean")
                .IsRequired();
        }

    }
}
