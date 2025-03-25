using AngularApp1.Server.Models;
using System.ComponentModel.DataAnnotations;

public class Component
{
    [Key]
    public int ComponentID { get; set; }
    public int ComponentSpecID { get; set; }
    public int ImageID { get; set; }
    public string ComponentName { get; set; }
    public string ComponentFID { get; set; }
    public string Packaging { get; set; }
    public double Length { get; set; }
    public double Width { get; set; }
    public double Height { get; set; }
    public int NumberOfCompInKLT { get; set; }
    public double ContainerWeight { get; set; }
    public string ContainerRange { get; set; }
    public int NumberOfContainerInFeeder { get; set; }
    public DateTime TimeReserveInFeeder { get; set; }
    public string SmbPackagingFeeding { get; set; }
    public int SmbNumberFeeding { get; set; }
    public string DmcMarking {  get; set; }

    public ICollection<UnitComponent> UnitComponents { get; set; }
    public ComponentSpecification ComponentSpecification { get; set; }
}