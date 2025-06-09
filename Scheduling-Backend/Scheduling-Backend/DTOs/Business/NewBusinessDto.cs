using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduling_Backend.DTOs.Business
{
    public class NewBusinessDto
    {
        public string BusinessEmail { get; set; } = string.Empty;
        public string BusinessName { get; set; } = string.Empty;
        public string BusinessPhone { get; set; } = string.Empty;
        public string BusinessAddress { get; set; } = string.Empty;
        public string BusinessDescription { get; set; } = string.Empty;
    }
}