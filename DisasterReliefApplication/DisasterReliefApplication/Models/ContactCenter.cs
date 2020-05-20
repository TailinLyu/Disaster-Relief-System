using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DisasterReliefApplication.Models
{
    /// <summary>
    /// A class to represent a contact center.
    /// </summary>
    public class ContactCenter
    {
        /// <summary>
        /// Primary key to uniquely identify the contact center.
        /// </summary>
        [Key]
        public int ContactCenterId { get; set; }

        /// <summary>
        /// The disaster events which this call center supports.
        /// </summary>
        ICollection<DisasterEvent> DisasterEvents { get; set; }

        /// <summary>
        /// The city where the contact center operates.
        /// </summary>
        public string City { get; set; }

        /// <summary>
        /// The country where the contact center operates.
        /// </summary>
        public string Country { get; set; }

        /// <summary>
        /// The zipcode where the contact center operates.
        /// </summary>
        public string ZipCode { get; set; }

        /// <summary>
        /// The state where the contact center operates, if applicable.
        /// </summary>
        public string State { get; set; }
    }
}
