using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduling_Backend.DTOs.Appointment
{
    public class UpdateAppointmentDto
    {
        [MinLength(3, ErrorMessage = "Client name must be between 3 and 30 characters.")]
        [MaxLength(30, ErrorMessage = "Client name must be between 3 and 30 characters.")]
        public string? ClientName { get; set; }
        [EmailAddress]
        [MaxLength(50, ErrorMessage = "Client email must be a valid email address and up to 50 characters long.")]
        public string? ClientEmail { get; set; }
        [Phone]
        [MaxLength(15, ErrorMessage = "Client phone must be a valid phone number and up to 15 characters long.")]
        public string? ClientPhone { get; set; }
        public string? Description { get; set; }
        public DateTime? StartTime { get; set; }
        public DateTime? EndTime { get; set; }
    }
}