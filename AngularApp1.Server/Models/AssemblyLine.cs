using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace AngularApp1.Server.Models
{
    public class AssemblyLine
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int lineID { get; set; }
        [Required]
        public required string name { get; set; }
        [Required]
        public required string description { get; set; }
        public DateTime dateCreated { get; set; } = DateTime.UtcNow;
        public DateTime dateEdited { get; set; } = DateTime.UtcNow;

        [Required]
        public int projectID { get; set; }
    }
}
