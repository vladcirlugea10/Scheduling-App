using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduling_Backend.Models
{
    public class BusinessProfile
    {
        [Key]
        [ForeignKey("User")]
        public string UserId { get; set; } = string.Empty;
        public string BusinessName { get; set; } = string.Empty;
        public string BusinessAddress { get; set; } = string.Empty;
        public string BusinessDescription { get; set; } = string.Empty;
        public User? User { get; set; }
        public List<Appointment> Appointments { get; set; } = new List<Appointment>();
    }
}