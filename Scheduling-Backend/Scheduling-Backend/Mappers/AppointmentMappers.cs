using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.CodeAnalysis.CSharp.Syntax;
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

        public static Appointment ToAppointmentFromCreateDto(this CreateAppointmentDto createAppointmentDto)
        {
            return new Appointment
            {
                BusinessId = createAppointmentDto.BusinessId,
                ClientName = createAppointmentDto.ClientName,
                ClientEmail = createAppointmentDto.ClientEmail,
                ClientPhone = createAppointmentDto.ClientPhone,
                Description = createAppointmentDto.Description,
                StartTime = createAppointmentDto.StartTime,
                EndTime = createAppointmentDto.EndTime,
                Status = Enums.AppointmentStatus.Pending
            };
        }
    }
}