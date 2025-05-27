using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Scheduling_Backend.Models;

namespace Scheduling_Backend.Data
{
    public class AppDBContext : IdentityDbContext<User>
    {
        public AppDBContext(DbContextOptions<AppDBContext> dbContextOptions) : base(dbContextOptions)
        {

        }

        public DbSet<Appointment> Appointments { get; set; }
        public DbSet<Business> Businesses { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            List<IdentityRole> roles = new List<IdentityRole>
            {
                new IdentityRole
                {
                    Id = "1",
                    Name = "Admin",
                    NormalizedName = "ADMIN"
                },
                new IdentityRole
                {
                    Id = "2",
                    Name = "User",
                    NormalizedName = "USER"
                },
                new IdentityRole
                {
                    Id = "3",
                    Name = "Business",
                    NormalizedName = "BUSINESS"
                },
            };
            builder.Entity<IdentityRole>().HasData(roles);
        }
    }
}