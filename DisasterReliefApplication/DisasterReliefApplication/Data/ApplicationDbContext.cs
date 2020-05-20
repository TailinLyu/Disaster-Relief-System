using DisasterReliefApplication.Models;
using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace DisasterReliefApplication.Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        public ApplicationDbContext(
            DbContextOptions options,
            IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
        {
        }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<DisasterEvent>();
            builder.Entity<ContactCenter>();
            builder.Entity<Request>();
            builder.Entity<Respond>();
            builder.Entity<Pledge>();
            builder.Entity<AppUser>();
        }

        public DbSet<DisasterEvent> DisasterEvents { get; set; }
        public DbSet<ContactCenter> ContactCenters { get; set; }
        public DbSet<Request> Requests { get; set; }
        public DbSet<Respond> Responds { get; set; }
        public DbSet<Pledge> Pledges { get; set; }
        public DbSet<AppUser> AppUsers { get; set; }
    }
}
