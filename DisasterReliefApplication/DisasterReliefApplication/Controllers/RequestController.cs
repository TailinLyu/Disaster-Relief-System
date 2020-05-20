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
    public class RequestController : ControllerBase
    {
        private readonly ILogger<DisasterEventController> _logger;
        private readonly ApplicationDbContext _dbContext;

        /// <summary>
        /// Constructor takes in the db context for the application as well as the logger.
        /// </summary>
        /// <param name="dbContext">The context of the database from services.</param>
        /// <param name="logger">Logger to use for logging information.</param>
        public RequestController(ApplicationDbContext dbContext, ILogger<DisasterEventController> logger)
        {
            _logger = logger;

            // Ensure any pending updates to db schema are applied
            dbContext.Database.Migrate();
            _dbContext = dbContext;
        }
        /// <summary>
        /// Method to handle adding a new request to the database.
        /// </summary>
        /// <param name="request">The disaster request to add to the database.</param>
        /// <returns>Status code and message.</returns>
        [HttpPost]
        public IActionResult CreateRequest([FromBody]Request request)
        {
            _dbContext.Add<Request>(request);
            _dbContext.SaveChanges();
            return Ok("Request Added");
        }
        /// <summary>
        /// Method to return all requests.
        /// </summary>
        /// <returns>Status code and message.</returns>
        [HttpGet]
        public IActionResult GetAllRequests()
        {
            var requests = _dbContext.Requests;
            List<Request> requestList = new List<Request>();
            foreach (Request thing in requests)
            { 
                requestList.Add(thing);
            }
            return Ok(requestList.ToArray());
        }
        /// <summary>
        /// When a donor responded to a request, the needed amount of the request would be filled.
        /// If the amount needed is less than amount donated, the request would be seen as expired,
        /// and the status should be set to false.
        /// Admin can also expire a request.
        /// </summary>
        /// <param name="id"></param>
        /// <param name="json"></param>
        /// <returns>Status code and message.</returns>
        [HttpPatch("{id}")]
        public IActionResult ReviseRequest(int id, [FromBody]JObject json){
            Request request = _dbContext.Requests.First(a => a.RequestId == id);
            bool status = (bool)json["status"];
            int amount = (int) json["amountNeeded"];
            request.AmountNeeded = request.AmountNeeded - amount;
            request.status = status;
            if(request.AmountNeeded <= 0) request.status = false;
            _dbContext.SaveChanges();
            return Ok("Request Patched");
        }
    }
}
