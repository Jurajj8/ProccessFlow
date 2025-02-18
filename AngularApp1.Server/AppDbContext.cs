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

    public DbSet<DiagramData> Diagrams { get; set; }
    public DbSet<Station> Stations { get; set; }

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

        modelBuilder.Entity<Projects>()
            .HasOne(p => p.Diagram)
            .WithOne()
            .HasForeignKey<DiagramData>(d => d.ProjectID)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Station>()
            .HasOne<AssemblyLine>()
            .WithMany(p => p.Stations)
            .HasForeignKey(al => al.AssemblyLineID);
   

        base.OnModelCreating(modelBuilder);

    }
}

