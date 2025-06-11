using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduling_Backend.DTOs.User
{
    public class NewUserDto
    {
        public string Email { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string? LastName { get; set; } = string.Empty;
        public string? PhoneNumber { get; set; } = string.Empty;
        public string Role { get; set; } = "User";
    }
}