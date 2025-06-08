using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduling_Backend.DTOs.Business
{
    public class BusinessRegisterDto
    {
        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email address")]
        public string Email { get; set; } = string.Empty;
        [Required(ErrorMessage = "Business name is required")]
        [MaxLength(50, ErrorMessage = "Business name cannot be longer than 50 characters")]
        [MinLength(3, ErrorMessage = "Business name must be at least 3 characters long")]
        public string Name { get; set; } = string.Empty;
        [Required(ErrorMessage = "Phone number is required")]
        [Phone(ErrorMessage = "Invalid phone number")]
        public string Phone { get; set; } = string.Empty;
        [Required(ErrorMessage = "Address is required")]
        [MaxLength(120, ErrorMessage = "Address cannot be longer than 120 characters")]
        public string Address { get; set; } = string.Empty;
        [Required(ErrorMessage = "Description is required")]
        [MaxLength(1200, ErrorMessage = "Description cannot be longer than 1200 characters")]
        [MinLength(10, ErrorMessage = "Description must be at least 10 characters long")]
        public string Description { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string ConfirmPassword { get; set; } = string.Empty;
    }
}