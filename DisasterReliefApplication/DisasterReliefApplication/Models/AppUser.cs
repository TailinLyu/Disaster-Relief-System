using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using Index = Microsoft.EntityFrameworkCore.Metadata.Internal.Index;

namespace DisasterReliefApplication.Models
{
    public class AppUser
    {
        [Key]
        public int UserId { get; set; }

        public ApplicationUser ApplicationUser { get; set; }


        public UserRoleEnum UserRole { get; set; }
    }
}
