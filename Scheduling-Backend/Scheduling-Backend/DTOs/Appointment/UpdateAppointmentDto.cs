using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduling_Backend.DTOs.Appointment
{
    public class UpdateAppointmentDto
    {
        public string? ClientName { get; set; }
        public string? ClientEmail { get; set; }
        public string? ClientPhone { get; set; }
        public string? Description { get; set; }
        public DateTime? StartTime { get; set; }
        public DateTime? EndTime { get; set; }
    }
}