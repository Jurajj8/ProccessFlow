using AngularApp1.Server.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

public class AppDbContext : IdentityDbContext<ApplicationUser>
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Project> Project { get; set; }
    public DbSet<PartChecking> PartChecking { get; set; }
    public DbSet<AssemblyLine> AssemblyLine { get; set; }
    public DbSet<Image> Image { get; set; }
    public DbSet<DiagramData> Diagram { get; set; }
    public DbSet<Station> Station { get; set; }
    public DbSet<Unit> Unit { get; set; }
    public DbSet<UnitSpecification> UnitSpecification { get; set; }
    public DbSet<Component> Component { get; set; }
    public DbSet<UnitComponent> UnitComponent { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Project>()
            .HasMany(p => p.AssemblyLines)
            .WithOne()
            .HasForeignKey(al => al.ProjectID)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<AssemblyLine>()
            .HasOne<Project>()
            .WithMany(p => p.AssemblyLines)
            .HasForeignKey(al => al.ProjectID);

        modelBuilder.Entity<Project>()
            .HasOne(p => p.Diagram)
            .WithOne()
            .HasForeignKey<DiagramData>(d => d.ProjectID)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Station>()
            .HasOne<AssemblyLine>()
            .WithMany(p => p.Stations)
            .HasForeignKey(al => al.AssemblyLineID);

        modelBuilder.Entity<Unit>()
            .HasOne<Station>()
            .WithMany(p => p.Units)
            .HasForeignKey(al => al.StationID);

        modelBuilder.Entity<Unit>()
            .HasOne(u => u.UnitSpecification)
            .WithOne(us => us.Unit)
            .HasForeignKey<UnitSpecification>(us => us.UnitID);

        modelBuilder.Entity<UnitComponent>()
            .HasKey(uc => new { uc.UnitID, uc.ComponentID });

        modelBuilder.Entity<UnitComponent>()
            .HasOne(uc => uc.Unit)
            .WithMany(u => u.UnitComponents)
            .HasForeignKey(uc => uc.UnitID);

        modelBuilder.Entity<UnitComponent>()
            .HasOne(uc => uc.Component)
            .WithMany(c => c.UnitComponents)
            .HasForeignKey(uc => uc.ComponentID);

        modelBuilder.Entity<Component>()
            .HasOne(c => c.ComponentSpecification)
            .WithMany(cs => cs.Components)
            .HasForeignKey(c => c.ComponentSpecID);

        base.OnModelCreating(modelBuilder);

    }
}

