using DisasterReliefApplication.Data;
using DisasterReliefApplication.Models;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace DisasterReliefApplication.Controllers
{
    /// <summary>
    /// A controller to manage requests for the application
    /// </summary>
    [ApiController]
    [Route("[controller]")]
    public class PledgeController : ControllerBase
    {
        private readonly ILogger<DisasterEventController> _logger;
        private readonly ApplicationDbContext _dbContext;

        /// <summary>
        /// Constructor takes in the db context for the application as well as the logger.
        /// </summary>
        /// <param name="dbContext">The context of the database from services.</param>
        /// <param name="logger">Logger to use for logging information.</param>
        public PledgeController(ApplicationDbContext dbContext, ILogger<DisasterEventController> logger)
        {
            _logger = logger;

            // Ensure any pending updates to db schema are applied
            dbContext.Database.Migrate();
            _dbContext = dbContext;
        }
        /// <summary>
        /// Method to handle adding a new request to the database.
        /// </summary>
        /// <param name="pledge">The disaster request to add to the database.</param>
        /// <returns>Status code and message.</returns>
        [HttpPost]
        public IActionResult CreatePledge([FromBody]Pledge pledge)
        {
            _dbContext.Add<Pledge>(pledge);  
            _dbContext.SaveChanges();
            return Ok("Pledge Added");
        }
        /// <summary>
        /// Method to return all pledges in database
        /// </summary>
        /// <returns>Array of pledges</returns>
        [HttpGet]
        public IActionResult GetAllPledges()
        {
            var pledges = _dbContext.Pledges;
            List<Pledge> pledgeList = new List<Pledge>();
            foreach (Pledge thing in pledges)
            {
                pledgeList.Add(thing);
            }
            return Ok(pledgeList.ToArray());
        }
        /// <summary>
        /// When a pledge is assigned to a request by an admin, the status of pledge should be set to false,
        /// and the amount needed in a request should be filled by the pledge amount.
        /// </summary>
        /// <param name="id">The pledge ID that is assigned to a request.</param>
        /// <param name="json">json contains the request ID which is filled by the pledge. </param>
        /// <returns>Status code and message.</returns>
        [HttpPatch("{id}")]
        public IActionResult ExpirePledge(int id, [FromBody]JObject json){
            Pledge pledge = _dbContext.Pledges.First(a => a.PledgeId == id);
            int requestId = (int)json["requestId"];
            Request request = _dbContext.Requests.First(a => a.RequestId == requestId);
            pledge.Status = false;
            request.AmountNeeded = request.AmountNeeded - pledge.AmountPledged;
            if(request.AmountNeeded <= 0) request.status = false;
            _dbContext.SaveChanges();
            return Ok("Pledge and Request have been patched");
        }
    } 
}
