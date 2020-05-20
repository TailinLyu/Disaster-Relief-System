using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DisasterReliefApplication.Data;
using DisasterReliefApplication.Models;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace DisasterReliefApplication.Controllers
{
    /// <summary>
    /// A controller to manage responds for the application
    /// </summary>
    [ApiController]
    [Route("[controller]")]
    public class RespondController : ControllerBase
    {
        private readonly ILogger<DisasterEventController> _logger;
        private readonly ApplicationDbContext _dbContext;

        /// <summary>
        /// Constructor takes in the db context for the application as well as the logger.
        /// </summary>
        /// <param name="dbContext">The context of the database from services.</param>
        /// <param name="logger">Logger to use for logging information.</param>
        public RespondController(ApplicationDbContext dbContext, ILogger<DisasterEventController> logger)
        {
            _logger = logger;

            // Ensure any pending updates to db schema are applied
            dbContext.Database.Migrate();
            _dbContext = dbContext;
        }
        /// <summary>
        /// Method to handle adding a new respond to the database.
        /// </summary>
        /// <param name="respond">The disaster respond to add to the database.</param>
        /// <returns>Status code and message.</returns>
        [HttpPost]
        public IActionResult CreateRespond([FromBody]Respond respond)
        {
            _dbContext.Add<Respond>(respond);
            _dbContext.SaveChanges();
            return Ok("Respond Added");
        }

    }
}
