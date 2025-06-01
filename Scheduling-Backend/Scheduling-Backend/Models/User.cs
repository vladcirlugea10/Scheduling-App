using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace Scheduling_Backend.Models
{
    public class User : IdentityUser
    {
        public UserProfile? UserProfile { get; set; }
        public BusinessProfile? BusinessProfile { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}