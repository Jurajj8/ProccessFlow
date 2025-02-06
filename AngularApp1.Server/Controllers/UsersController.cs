using AngularApp1.Server.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace AngularApp1.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly SignInManager<ApplicationUser> signInManager;
        private readonly IConfiguration configuration;
        private readonly IWebHostEnvironment _env;
        private readonly AppDbContext _context;

        public UsersController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IConfiguration configuration, IWebHostEnvironment env, AppDbContext context)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.configuration = configuration;
            this._env = env;
            this._context = context;
        }

        [HttpPost("register")]
        public async Task<ActionResult<AuthenticationResponse>> Register(UserCredentials credentials)
        {
            Console.WriteLine($"Received registration request: {credentials.Email}, {credentials.Username}");

            if (!ModelState.IsValid)
            {
                Console.WriteLine("Model state is invalid");
                return BadRequest(ModelState);
            }

            var existingUserByEmail = await userManager.FindByEmailAsync(credentials.Email);
            if (existingUserByEmail != null)
            {
                var errors = new List<IdentityError>
        {
            new IdentityError { Description = "Email is already in use" }
        };
                return BadRequest(errors);
            }

            var existingUserByUsername = await userManager.FindByNameAsync(credentials.Username);
            if (existingUserByUsername != null)
            {
                var errors = new List<IdentityError>
        {
            new IdentityError { Description = "Username is already in use" }
        };
                return BadRequest(errors);
            }

            var user = new ApplicationUser
            {
                UserName = credentials.Username,
                Email = credentials.Email
            };

            var result = await userManager.CreateAsync(user, credentials.Password);

            if (result.Succeeded)
            {
                await userManager.AddToRoleAsync(user, "User");
                return await BuildToken(user);
            }
            else
            {
                Console.WriteLine("User creation failed");
                return BadRequest(result.Errors);
            }
        }

        [HttpPost("login")]
        public async Task<ActionResult<AuthenticationResponse>> Login(UserCredentials credentials)
        {
            var user = await userManager.FindByEmailAsync(credentials.Email);

            if (user is null)
            {
                var errors = BuildIncorrectLoginErrorMessage();
                return BadRequest(errors);
            }

            var result = await signInManager.CheckPasswordSignInAsync(user, credentials.Password, lockoutOnFailure: false);

            if (result.Succeeded)
            {
                return await BuildToken(user);
            }
            else
            {
                var errors = BuildIncorrectLoginErrorMessage();
                return BadRequest(errors);
            }
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ApplicationUser>>> GetUsers()
        {
            var users = userManager.Users.ToList();
            return Ok(users);
        }

        [HttpGet("{email}")]
        public async Task<ActionResult<ApplicationUser>> GetUserByEmail(string email)
        {
            var user = await userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPost]
        public async Task<IActionResult> AddUser([FromBody] UserCredentials newUser)
        {
            if (newUser == null)
            {
                return BadRequest("Invalid user data.");
            }

            var existingUserByEmail = await userManager.FindByEmailAsync(newUser.Email);
            if (existingUserByEmail != null)
            {
                return BadRequest("Email is already in use.");
            }

            var user = new ApplicationUser
            {
                UserName = newUser.Username,
                Email = newUser.Email
            };

            var result = await userManager.CreateAsync(user, newUser.Password);
            if (result.Succeeded)
            {
                return Ok(user);
            }
            else
            {
                foreach (var error in result.Errors)
                {
                    Console.WriteLine($"Error: {error.Code} - {error.Description}");
                }
                return BadRequest(result.Errors);
            }
        }


        [HttpPut("{email}")]
        public async Task<IActionResult> UpdateUser(string email, [FromBody] UserCredentials updatedUser)
        {
            var user = await userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return NotFound();
            }

            user.UserName = updatedUser.Username;
            user.Email = updatedUser.Email;

            var result = await userManager.UpdateAsync(user);
            if (result.Succeeded)
            {
                return NoContent();
            }
            else
            {
                return BadRequest(result.Errors);
            }
        }

        [HttpDelete("{email}")]
        public async Task<IActionResult> DeleteUser(string email)
        {
            var user = await userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return NotFound();
            }

            var result = await userManager.DeleteAsync(user);
            if (result.Succeeded)
            {
                return NoContent();
            }
            else
            {
                return BadRequest(result.Errors);
            }
        }

        [HttpPost("{email}/roles")]
        public async Task<IActionResult> AddRoleToUser(string email, [FromBody] string role)
        {
            var user = await userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return NotFound();
            }

            var result = await userManager.AddToRoleAsync(user, role);
            if (result.Succeeded)
            {
                return NoContent();
            }
            else
            {
                return BadRequest(result.Errors);
            }
        }

        [HttpDelete("{email}/roles")]
        public async Task<IActionResult> RemoveRoleFromUser(string email, [FromBody] string role)
        {
            var user = await userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return NotFound();
            }

            var result = await userManager.RemoveFromRoleAsync(user, role);
            if (result.Succeeded)
            {
                return NoContent();
            }
            else
            {
                return BadRequest(result.Errors);
            }
        }

        private IEnumerable<IdentityError> BuildIncorrectLoginErrorMessage()
        {
            var identityError = new IdentityError() { Description = "Incorrect login" };
            var errors = new List<IdentityError>();
            errors.Add(identityError);
            return errors;
        }

        private async Task<AuthenticationResponse> BuildToken(IdentityUser user)
        {
            var claims = new List<Claim>
            {
                new Claim("email", user.Email!),
                new Claim("username", user.UserName!)
            };

            var claimsDB = await userManager.GetClaimsAsync((ApplicationUser)user);
            claims.AddRange(claimsDB);

            var roles = await userManager.GetRolesAsync((ApplicationUser)user);
            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["jwtkey"]!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var expiration = DateTime.UtcNow.AddDays(1);

            var securityToken = new JwtSecurityToken(issuer: null, audience: null, claims: claims, expires: expiration, signingCredentials: creds);

            var token = new JwtSecurityTokenHandler().WriteToken(securityToken);

            return new AuthenticationResponse
            {
                Token = token,
                Expiration = expiration
            };
        }
    }
}
