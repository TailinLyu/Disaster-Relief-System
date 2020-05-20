using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace DisasterReliefApplication.Models
{
    /// <summary>
    /// Class for pledges
    /// </summary>
        public class Pledge
        {
            ///<summary>
            /// Primary key of a pledge
            /// </summary>
            [Key]
            public int PledgeId { get; set; }
            /// <summary>
            /// Description of a pledge
            /// </summary>
            public string PledgeDescription { get; set; }
            /// <summary>
            /// Describe how many goods are pledged for the request
            /// </summary>
            public int AmountPledged { get; set; }

            /// <summary>
            /// The date of the respond.
            /// </summary>
            public DateTime PledgeDate { get; set; }

            /// <summary>
            /// Represent which category can be pledged to
            /// </summary>

            public CategotyEnum? Category { get; set; }

            /// <summary>
            /// Represent the pledge has been used or not
            /// </summary>
            public bool Status { get; set; }
            
        }
    }
