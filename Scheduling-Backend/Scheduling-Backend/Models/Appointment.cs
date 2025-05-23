using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Scheduling_Backend.Enums;

namespace Scheduling_Backend.Models
{
    public class Appointment
    {
        public int Id { get; set; }
        public int? BusinessId { get; set; }
        public Business? Business { get; set; }
        public string ClientName { get; set; } = string.Empty;
        public string ClientEmail { get; set; } = string.Empty;
        public string ClientPhone { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public AppointmentStatus Status { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}