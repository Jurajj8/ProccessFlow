using AngularApp1.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using System.IO;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace AngularApp1.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ImagesController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly AppDbContext _context;
        private readonly IWebHostEnvironment _env;

        public ImagesController(UserManager<ApplicationUser> userManager, AppDbContext context, IWebHostEnvironment env)
        {
            this.userManager = userManager;
            this._context = context;
            this._env = env;
        }

        [HttpPost("upload")]
        public async Task<IActionResult> UploadImage([FromForm] IFormFile file, [FromForm] string email)
        {
            if (file == null || file.Length == 0)
                return BadRequest("No file uploaded.");

            var allowedExtensions = new[] { ".jpg", ".jpeg", ".png" };
            var extension = Path.GetExtension(file.FileName).ToLowerInvariant();

            if (!allowedExtensions.Contains(extension))
            {
                return BadRequest("Only JPG and PNG files are allowed.");
            }
            var uploadsFolder = Path.Combine(_env.WebRootPath, "uploads");
            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }

            var filePath = Path.Combine(uploadsFolder, file.FileName);

            try
            {
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error uploading file: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }

            var image = new Image
            {
                Name = file.FileName,
                ImagePath = $"/uploads/{file.FileName}"
            };

            _context.Images.Add(image);
            await _context.SaveChangesAsync();

            Console.WriteLine($"Image added to database: {image.ImageID}, {image.Name}, {image.ImagePath}");

            var user = await userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return NotFound("User not found.");
            }

            user.ImageId = image.ImageID;

            var result = await userManager.UpdateAsync(user);
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return Ok(new { filePath = image.ImagePath });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetImage(int id)
        {
            var image = await _context.Images.FindAsync(id);
            if (image == null)
            {
                return NotFound();
            }

            var uploadsFolder = Path.Combine(_env.WebRootPath, "uploads");
            var filePath = Path.Combine(uploadsFolder, image.Name);

            if (!System.IO.File.Exists(filePath))
            {
                return NotFound();
            }

            var imageBytes = await System.IO.File.ReadAllBytesAsync(filePath);
            return File(imageBytes, "image/jpeg");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteImage(int id)
        {
            var image = await _context.Images.FindAsync(id);
            if (image == null)
            {
                return NotFound();
            }

            var usersWithImage = _context.Users.Where(u => u.ImageId == id).ToList();
            foreach (var user in usersWithImage)
            {
                user.ImageId = null; 
                _context.Users.Update(user);
            }

            _context.Images.Remove(image);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                return StatusCode(500, new { message = "Error deleting image", error = ex.Message });
            }

            return NoContent();
        }
    }
}