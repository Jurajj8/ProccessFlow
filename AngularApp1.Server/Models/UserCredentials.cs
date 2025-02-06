using System.ComponentModel.DataAnnotations;

namespace AngularApp1.Server.Models
{
    public class UserCredentials
    {
        [Required]
        [EmailAddress]
        public required string Email { get; set; }
        [Required]
        public required string Password { get; set; }
        [Required]
        public required string Username { get; set; }
        public string? ProfileImagePath { get; set; }
        public int? ImageId { get; set; }
    }
}
