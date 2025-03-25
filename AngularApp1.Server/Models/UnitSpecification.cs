using System.ComponentModel.DataAnnotations;

namespace AngularApp1.Server.Models
{
    public class UnitSpecification
    {
        [Key]
        public int UnitSpecId { get; set; }
        public string Type { get; set; }
        public string MountingPosition { get; set; }
        public double CycleTime { get; set; }
        public double TotalMass { get; set; }
        public string QAActivities { get; set; }
        public string ProcessStepDescription { get; set; }
        public string Tolerances { get; set; }

        public int UnitID { get; set; }
        public Unit Unit { get; set; }
    }
}
