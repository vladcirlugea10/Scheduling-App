using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduling_Backend.Models
{
    public class Business
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public List<Appointment> Appointments { get; set; } = new List<Appointment>();
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}