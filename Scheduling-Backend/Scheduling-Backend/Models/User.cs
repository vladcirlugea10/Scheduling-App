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
        public string FirstName { get; set; } = string.Empty;
        public string? LastName { get; set; }
    }
}