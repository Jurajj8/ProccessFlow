using Microsoft.AspNetCore.Identity;

public class ApplicationUser : IdentityUser
{
    public int? ImageId { get; set; }
}