using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Scheduling_Backend.Data;
using Scheduling_Backend.DTOs.Appointment;
using Scheduling_Backend.Mappers;

namespace Scheduling_Backend.Controllers
{
    [Route("api/appointments")]
    [ApiController]
    public class AppointmentController : ControllerBase
    {
        private readonly AppDBContext _context;
        public AppointmentController(AppDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAppointments()
        {
            var appointments = _context.Appointments.Select(a => a.ToAppointmentDto()).ToList();

            if (appointments == null || !appointments.Any())
            {
                return NotFound("No appointments found!");
            }
            return Ok(appointments);
        }

        [HttpGet("{id}")]
        public IActionResult GetAppointmentById([FromRoute] int id)
        {
            var appointment = _context.Appointments.Find(id);

            if (appointment == null)
            {
                return NotFound($"Appointment with ID: {id} not found!");
            }
            return Ok(appointment.ToAppointmentDto());
        }

        [HttpPost]
        public IActionResult CreateAppointment([FromBody] CreateAppointmentDto createAppointmentDto)
        {
            if (createAppointmentDto == null)
            {
                return BadRequest("Invalid appointment data!");
            }

            var appointment = createAppointmentDto.ToAppointmentFromCreateDto();
            _context.Appointments.Add(appointment);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetAppointmentById), new { id = appointment.Id }, appointment.ToAppointmentDto());
        }

        [HttpPut]
        [Route("{id}")]
        public IActionResult UpdateAppointment([FromRoute] int id, [FromBody] UpdateAppointmentDto updateAppointmentDto)
        {
            var appointment = _context.Appointments.FirstOrDefault(a => a.Id == id);
            if (appointment == null)
            {
                return NotFound($"Appointment with ID: {id} not found!");
            }
            if (updateAppointmentDto.ClientName != null)
            {
                appointment.ClientName = updateAppointmentDto.ClientName;
            }
            if (updateAppointmentDto.ClientEmail != null)
            {
                appointment.ClientEmail = updateAppointmentDto.ClientEmail;
            }
            if (updateAppointmentDto.ClientPhone != null)
            {
                appointment.ClientPhone = updateAppointmentDto.ClientPhone;
            }
            if (updateAppointmentDto.Description != null)
            {
                appointment.Description = updateAppointmentDto.Description;
            }
            if (updateAppointmentDto.StartTime != null)
            {
                appointment.StartTime = updateAppointmentDto.StartTime.Value;
            }
            if (updateAppointmentDto.EndTime != null)
            {
                appointment.EndTime = updateAppointmentDto.EndTime.Value;
            }

            _context.SaveChanges();
            return Ok(appointment.ToAppointmentDto());
        }

        [HttpDelete]
        [Route("{id}")]
        public IActionResult DeleteAppointment([FromRoute] int id)
        {
            var appointment = _context.Appointments.FirstOrDefault(a => a.Id == id);
            if (appointment == null)
            {
                return NotFound($"Appointment with ID: {id} not found!");
            }

            _context.Appointments.Remove(appointment);
            _context.SaveChanges();

            return NoContent();
        }
    }
}