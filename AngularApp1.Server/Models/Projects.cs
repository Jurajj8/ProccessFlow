using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace AngularApp1.Server.Models
{
    public class Projects
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ProjectID { get; set; }
        public ProjectsStatusEnum Status { get; set; } = ProjectsStatusEnum.InDevelopment;
        public required string Name { get; set; }
        public string? Description { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedDate { get; set; } = DateTime.UtcNow;
        public DiagramData Diagram { get; set; }

        public ICollection<AssemblyLine> AssemblyLines { get; set; } = new List<AssemblyLine>();

    }


}
