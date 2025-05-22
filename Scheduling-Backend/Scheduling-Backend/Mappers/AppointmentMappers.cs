using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Scheduling_Backend.DTOs.Appointment;
using Scheduling_Backend.Models;

namespace Scheduling_Backend.Mappers
{
    public static class AppointmentMappers
    {
        public static AppointmentDto ToAppointmentDto(this Appointment appointmentModel)
        {
            return new AppointmentDto
            {
                Id = appointmentModel.Id,
                ClientName = appointmentModel.ClientName,
                ClientEmail = appointmentModel.ClientEmail,
                ClientPhone = appointmentModel.ClientPhone,
                Description = appointmentModel.Description,
                StartTime = appointmentModel.StartTime,
                EndTime = appointmentModel.EndTime,
                Status = appointmentModel.Status
            };
        }
    }
}