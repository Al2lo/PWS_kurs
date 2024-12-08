using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using VeloMap.Domain.AuthService.Models;

namespace VeloMap.Domain.AuthService.Configurations
{
    internal class TokenConfiguration : IEntityTypeConfiguration<Token>
    {
        public void Configure(EntityTypeBuilder<Token> builder)
        {
            builder.ToTable("Tokens")
                .HasKey(x => x.Id);

            builder.Property(x => x.Id)
                .ValueGeneratedOnAdd();

            builder.Property(x => x.RefreshToken)
                .HasMaxLength(500)
                .IsRequired()
                .HasColumnType("varchar");

            builder.Property(x => x.CreateDate)
                .HasColumnType("datetime")
                .IsRequired();

            builder.Property(x => x.ExpiresDate)
                .HasColumnType("datetime")
                .IsRequired();
        }
    }
}
