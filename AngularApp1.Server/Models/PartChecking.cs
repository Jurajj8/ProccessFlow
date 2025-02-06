using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace AngularApp1.Server.Models
{
    public class PartChecking
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int PartCheckID { get; set; }
        public required string Name { get; set; }
        public required string Type { get; set; }
    }
}
