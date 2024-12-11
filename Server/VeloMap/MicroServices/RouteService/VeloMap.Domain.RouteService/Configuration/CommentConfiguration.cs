using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using VeloMap.Domain.RouteService.Models;


namespace VeloMap.Domain.RouteService.Configuration
{
    internal class CommentConfiguration : IEntityTypeConfiguration<Comment>
    {
        public void Configure(EntityTypeBuilder<Comment> builder)
        {
            builder.ToTable("Comments")
               .HasKey(x => x.Id);

            builder.HasOne(c => c.Route)
                .WithMany(r => r.Comments) 
                .HasForeignKey(c => c.RouteId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(c => c.ParentComment)
                .WithMany(c => c.ChildComments) 
                .HasForeignKey(c => c.ParentCommentId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Property(x => x.UserId)
                .IsRequired()
                .HasColumnType("int");


            builder.Property(c => c.Text)
                .IsRequired() 
                .HasMaxLength(1000); 
        }
    }
}
