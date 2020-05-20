using System;
using System.ComponentModel.DataAnnotations;

namespace DisasterReliefApplication.Models
{
    /// <summary>
    /// A class to represent a disaster event.
    /// </summary>
    public class DisasterEvent
    {
        /// <summary>
        /// Primary key of the event to uniquely identify it.
        /// </summary>
        [Key]
        public int EventId { get; set; }

        /// <summary>
        /// The country where the disaster event occurred.
        /// </summary>
        public string Country { get; set; }

        /// <summary>
        /// The city where the disaster event occurred.
        /// </summary>
        public string City { get; set; }

        /// <summary>
        /// The zipcode where the disaster event occurred.
        /// </summary>
        public string ZipCode { get; set; }

        /// <summary>
        /// The state where the disaster event occurred, if applicable.
        /// </summary>
        public string State { get; set; }

        /// <summary>
        /// The contact center responsible for this disaster event.
        /// </summary>
        public ContactCenter ContactCenter { get; set; }

        /// <summary>
        /// The description of the event.
        /// </summary>
        public string EventDescription { get; set; }

        /// <summary>
        /// The start date of the event.
        /// </summary>
        public DateTime EventStartDate { get; set; }

        /// <summary>
        /// The end date of the event.
        /// </summary>
        public DateTime EventEndDate { get; set; }
    }
}
