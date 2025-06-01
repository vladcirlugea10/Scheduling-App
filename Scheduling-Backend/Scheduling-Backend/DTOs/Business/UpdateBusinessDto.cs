using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduling_Backend.DTOs.Business
{
    public class UpdateBusinessDto
    {
        public string? BusinessName { get; set; }
        public string? BusinessEmail { get; set; }
        public string? BusinessPhone { get; set; }
        public string? BusinessAddress { get; set; }
        public string? BusinessDescription { get; set; }
    }
}