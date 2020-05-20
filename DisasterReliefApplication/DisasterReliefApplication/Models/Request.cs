using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DisasterReliefApplication.Models
{
    /// <summary>
    /// Class for requesets
    /// </summary>
    public class Request
    {
        ///<summary>
        /// Primary key of a request
        /// </summary>
        [Key]
        public int RequestId { get; set; }

        ///<summary>
        /// Categories that a request contain
        /// </summary>
        public CategotyEnum? Category { get; set; }

        /// <summary>
        /// The start date of the request.
        /// </summary>
        public DateTime RequestStartDate { get; set; }

        /// <summary>
        /// The end date of the request.
        /// </summary>
        public DateTime RequestEndDate { get; set; }

        /// <summary>
        /// Using a foreign key to denote the event that request belongs to
        /// </summary>
        public DisasterEvent DisasterEvent { get; set; }
        [ForeignKey("DisasterEvent")]
        public int DisasterEventFK { get; set; }

        ///<summary>
        /// Description of the request
        /// </summary>
        public String RequestDescription { get; set; }
        /// <summary>
        /// The current status of the request: True => Still Needed, False => Expired
        /// </summary>
        public Boolean status { get; set; }
        /// <summary>
        /// Describe how many goods are needed for the request
        /// </summary>
        public int AmountNeeded { get; set; }
    }
}
