using AngularApp1.Server.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

public class AppDbContext : IdentityDbContext<ApplicationUser>
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Projects> Projects { get; set; }
    public DbSet<PartChecking> PartChecking { get; set; }
    public DbSet<AssemblyLine> AssemblyLine { get; set; }

    public DbSet<Image> Images { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Projects>()
            .HasMany(p => p.AssemblyLines)
            .WithOne()
            .HasForeignKey(al => al.projectID)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<AssemblyLine>()
            .HasOne<Projects>()
            .WithMany(p => p.AssemblyLines)
            .HasForeignKey(al => al.projectID);
    }
}

