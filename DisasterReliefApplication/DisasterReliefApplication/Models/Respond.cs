using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DisasterReliefApplication.Models
{
    /// <summary>
    /// Class for responds
    /// </summary>
    public class Respond
    {
        ///<summary>
        /// Primary key of a respond
        /// </summary>
        [Key]
        public int RespondId { get; set; }

        /// <summary>
        /// Describe how many goods are donated for the request
        /// </summary>
        public int AmountDonated { get; set; }

        /// <summary>
        /// The date of the respond.
        /// </summary>
        public DateTime RespondDate { get; set; }

        /// <summary>
        /// Using a foreign key to denote the request that respond to
        /// </summary>
    
        [ForeignKey("Request")]
        public int RequestFK { get; set; }
    }
}
