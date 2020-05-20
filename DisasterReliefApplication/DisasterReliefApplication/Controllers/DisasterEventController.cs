using DisasterReliefApplication.Data;
using DisasterReliefApplication.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;

namespace DisasterReliefApplication.Controllers
{
    /// <summary>
    /// A controller to manage disaster events for the application
    /// </summary>
    [ApiController]
    [Route("[controller]")]
    public class DisasterEventController : ControllerBase
    {
        private readonly ILogger<DisasterEventController> _logger;
        private readonly ApplicationDbContext _dbContext;

        /// <summary>
        /// Constructor takes in the db context for the application as well as the logger.
        /// </summary>
        /// <param name="dbContext">The context of the database from services.</param>
        /// <param name="logger">Logger to use for logging information.</param>
        public DisasterEventController(ApplicationDbContext dbContext, ILogger<DisasterEventController> logger)
        {
            _logger = logger;

            // Ensure any pending updates to db schema are applied
            dbContext.Database.Migrate();
            _dbContext = dbContext;
        }


        /// <summary>
        /// Method to handle adding a new event to the database.
        /// </summary>
        /// <param name="disasterEvent">The disaster event to add to the database.</param>
        /// <returns>Status code and message.</returns>
        [HttpPost]

        public IActionResult CreateEvent([FromBody]DisasterEvent disasterEvent)
        {
            _dbContext.Add<DisasterEvent>(disasterEvent);
            _dbContext.SaveChanges();
            return Ok("Event Added");
        }
        [HttpGet]
        public IActionResult GetAllEvents()
        {
            var events = _dbContext.DisasterEvents;
            List<DisasterEvent> eventList = new List<DisasterEvent>();
            foreach (DisasterEvent thing in events)
            {
                eventList.Add(thing);
            }
            return Ok(eventList.ToArray());
        }
    }
}