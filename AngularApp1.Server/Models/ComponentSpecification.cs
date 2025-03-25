using System.ComponentModel.DataAnnotations;

namespace AngularApp1.Server.Models
{
    public class ComponentSpecification
    {
        [Key]
        public int ComponentSpecID { get; set; }
        public int Quantity { get; set; }
        public double MassPerPart { get; set; }
        public string Individualisation { get; set; }
        public string Provisioning { get; set; }

        public ICollection<Component> Components { get; set; }
    }
}
