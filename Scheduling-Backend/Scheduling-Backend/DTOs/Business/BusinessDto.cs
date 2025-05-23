using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Scheduling_Backend.DTOs.Appointment;
using Scheduling_Backend.Models;

namespace Scheduling_Backend.DTOs.Business
{
    public class BusinessDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public List<AppointmentDto> Appointments { get; set; } = new List<AppointmentDto>();
    }
}