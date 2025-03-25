using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace AngularApp1.Server.Models
{
    public class AssemblyLine
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int LineID { get; set; }
        [Required]
        public required string Name { get; set; }
        [Required]
        public required string Description { get; set; }
        public DateTime DateCreated { get; set; } = DateTime.UtcNow;
        public DateTime DateEdited { get; set; } = DateTime.UtcNow;

        [Required]
        public int ProjectID { get; set; }
        public ICollection<Station> Stations { get; set; } = new List<Station>();
    }
}
