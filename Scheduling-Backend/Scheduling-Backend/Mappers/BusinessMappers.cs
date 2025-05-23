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
        public static BusinessDto ToBusinessDto(this Business businessModel)
        {
            return new BusinessDto
            {
                Id = businessModel.Id,
                Name = businessModel.Name,
                Email = businessModel.Email,
                Phone = businessModel.Phone,
                Address = businessModel.Address,
                Description = businessModel.Description,
                Appointments = businessModel.Appointments
            };
        }
    }
}