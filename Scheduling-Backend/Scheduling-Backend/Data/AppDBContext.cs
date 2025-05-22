using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Scheduling_Backend.Models;

namespace Scheduling_Backend.Data
{
    public class AppDBContext : DbContext
    {
        public AppDBContext(DbContextOptions<AppDBContext> dbContextOptions) : base(dbContextOptions)
        {

        }

        public DbSet<Appointment> Appointments { get; set; }
    }
}