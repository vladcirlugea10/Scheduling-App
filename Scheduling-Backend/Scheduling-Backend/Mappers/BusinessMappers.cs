using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Scheduling_Backend.DTOs.Business;
using Scheduling_Backend.Models;

namespace Scheduling_Backend.Mappers
{
    public static class BusinessMappers
    {
        public static BusinessDto ToBusinessDto(this BusinessProfile businessModel)
        {
            return new BusinessDto
            {
                Id = businessModel.UserId,
                Name = businessModel.BusinessName,
                Email = businessModel.User.Email,
                Phone = businessModel.User.PhoneNumber,
                Address = businessModel.BusinessAddress,
                Description = businessModel.BusinessDescription,
                Appointments = businessModel.Appointments.Select(a => a.ToAppointmentDto()).ToList()
            };
        }
    }
}