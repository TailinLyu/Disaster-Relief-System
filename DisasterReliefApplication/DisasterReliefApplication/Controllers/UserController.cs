using DisasterReliefApplication.Data;
using DisasterReliefApplication.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace DisasterReliefApplication.Controllers
{
    /// <summary>
    /// A controller to manage disaster events for the application
    /// </summary>
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private static ApplicationDbContext _dbContext;
        private readonly UserManager<ApplicationUser> _userManager;

        /// <summary>
        /// Constructor takes in the db context for the application as well as the logger.
        /// </summary>
        /// <param name="dbContext">The context of the database from services.</param>
        /// <param name="logger">Logger to use for logging information.</param>
        public UserController(ApplicationDbContext dbContext, ILogger<UserController> logger,
            UserManager<ApplicationUser> userManager)
        {
            _logger = logger;
            _userManager = userManager;

            // Ensure any pending updates to db schema are applied
            dbContext.Database.Migrate();
            _dbContext = dbContext;
        }

        /// <summary>
        /// Creates an AppUser which we can use for determining admin and non admin functions.
        /// </summary>
        /// <param name="email">The email of the user.</param>
        [HttpPost]
        public IActionResult CreateUser(string email)
        {
            AppUser existingUser = null;
            var createdUser = _dbContext.Users.Where(u => u.Email.Equals(email)).First();
            try
            {
                existingUser = _dbContext.AppUsers.Where(u => u.ApplicationUser.Id.Equals(createdUser.Id)).First();
            }
            catch (Exception)
            {
                _logger.LogDebug($"User with name {email} already in the DB");
            }

            if (existingUser == null)
            {
                var user = new AppUser
                {
                    ApplicationUser = createdUser,
                    UserRole = UserRoleEnum.NON_ADMIN
                };
                try
                {
                    _dbContext.Add<AppUser>(user);
                    _dbContext.SaveChanges();
                }
                catch (Exception)
                {
                    _logger.LogDebug("User not added for uknown reason");
                }
            }

            return Ok();
        }

        /// <summary>
        /// Attempts to change a user role to administrator. 
        /// </summary>
        /// <param name="adminCredentials">The admin credentials to use.</param>
        [HttpPut]
        public IActionResult MakeUserAdmin([FromBody] AdminCredentials adminCredentials)
        {
            if (string.IsNullOrEmpty(adminCredentials.UserName) || string.IsNullOrEmpty(adminCredentials.Password))
            {
                return Ok("Incorrect password");
            }

            string returnMessage = "You are an administrator";
            var user = _dbContext.AppUsers.Where(u => u.ApplicationUser.Email.Equals(adminCredentials.UserName)).First();

            if (adminCredentials.Password.Equals(AdminCredentials.AdminPassword))
            {
                user.UserRole = UserRoleEnum.ADMINISTRATOR;
            }
            else
            {
                user.UserRole = UserRoleEnum.NON_ADMIN;
                returnMessage = "Incorrect password";
            }

            _dbContext.SaveChanges();

            return Ok(returnMessage);
        }

        /// <summary>
        /// Retrieves the current user of the application if authenticated
        /// </summary>
        /// <returns>The current AppUser.</returns>
        [HttpGet]
        public IActionResult GetCurrentUser()
        {
            var email = User.Identity.Name;
            var applicationUser = _userManager.FindByEmailAsync(email);
            var user = _dbContext.AppUsers.Where(u => u.ApplicationUser.Id.Equals(applicationUser.Result.Id)).First();
            return Ok(user);
        }
    }
}