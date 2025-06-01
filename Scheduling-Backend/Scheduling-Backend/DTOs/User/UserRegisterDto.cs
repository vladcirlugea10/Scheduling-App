using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduling_Backend.DTOs.User
{
    public class UserRegisterDto
    {
        [Required(ErrorMessage = "First name is required")]
        [MaxLength(15, ErrorMessage = "First name cannot be longer than 50 characters")]
        public string? FirstName { get; set; }
        [MaxLength(20, ErrorMessage = "Last name cannot be longer than 50 characters")]
        public string? LastName { get; set; } = string.Empty;
        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email address")]
        public string? Email { get; set; }
        [Phone(ErrorMessage = "Invalid phone number")]
        public string? PhoneNumber { get; set; }
        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; } = string.Empty;
    }
}