using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Scheduling_Backend.DTOs.User;
using Scheduling_Backend.Models;

namespace Scheduling_Backend.Mappers
{
    public static class UserMappers
    {
        public static UserDto ToUserDto(this UserProfile userModel)
        {
            return new UserDto
            {
                Id = userModel.UserId,
                Email = userModel.User.Email,
                FirstName = userModel.FirstName,
                LastName = userModel.LastName,
                PhoneNumber = userModel.User.PhoneNumber,
            };
        }
    }
}