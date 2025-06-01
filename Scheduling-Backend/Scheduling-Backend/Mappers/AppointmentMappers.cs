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
                BusinessId = appointmentModel.BusinessId,
                ClientName = appointmentModel.ClientName,
                ClientEmail = appointmentModel.ClientEmail,
                ClientPhone = appointmentModel.ClientPhone,
                Description = appointmentModel.Description,
                StartTime = appointmentModel.StartTime,
                EndTime = appointmentModel.EndTime,
                Status = appointmentModel.Status
            };
        }

        public static Appointment ToAppointmentFromCreateDto(this CreateAppointmentDto createAppointmentDto, string businessId)
        {
            return new Appointment
            {
                ClientName = createAppointmentDto.ClientName,
                ClientEmail = createAppointmentDto.ClientEmail,
                ClientPhone = createAppointmentDto.ClientPhone,
                Description = createAppointmentDto.Description,
                StartTime = createAppointmentDto.StartTime,
                EndTime = createAppointmentDto.EndTime,
                Status = Enums.AppointmentStatus.Pending,
                BusinessId = businessId
            };
        }

        public static Appointment ToAppointmentFromUpdateDto(this UpdateAppointmentDto updateAppointmentDto)
        {
            return new Appointment
            {
                ClientName = updateAppointmentDto.ClientName ?? string.Empty,
                ClientEmail = updateAppointmentDto.ClientEmail ?? string.Empty,
                ClientPhone = updateAppointmentDto.ClientPhone ?? string.Empty,
                Description = updateAppointmentDto.Description ?? string.Empty,
                StartTime = updateAppointmentDto.StartTime ?? DateTime.Now,
                EndTime = updateAppointmentDto.EndTime ?? DateTime.Now.AddHours(1),
                Status = Enums.AppointmentStatus.Pending
            };
        }
    }
}