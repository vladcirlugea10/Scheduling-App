using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
        public async Task<IActionResult> GetAppointments()
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var appointments = await _context.Appointments.Select(a => a.ToAppointmentDto()).ToListAsync();

            if (appointments == null || !appointments.Any())
            {
                return NotFound("No appointments found!");
            }
            return Ok(appointments);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetAppointmentById([FromRoute] int id)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var appointment = await _context.Appointments.FindAsync(id);

            if (appointment == null)
            {
                return NotFound($"Appointment with ID: {id} not found!");
            }
            return Ok(appointment.ToAppointmentDto());
        }

        [HttpPost("{businessId}")]
        public async Task<IActionResult> CreateAppointment([FromRoute] string businessId, [FromBody] CreateAppointmentDto createAppointmentDto)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var business = await _context.Users.Include(u => u.BusinessProfile).FirstOrDefaultAsync(u => u.Id == businessId);
            if (business == null || business.BusinessProfile == null)
            {
                return NotFound($"Business with ID: {businessId} not found!");
            }
            if (createAppointmentDto == null)
            {
                return BadRequest("Invalid appointment data!");
            }

            var appointment = createAppointmentDto.ToAppointmentFromCreateDto(businessId);
            appointment.BusinessUser = business;
            await _context.Appointments.AddAsync(appointment);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAppointmentById), new { id = appointment.Id }, appointment.ToAppointmentDto());
        }

        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> UpdateAppointment([FromRoute] int id, [FromBody] UpdateAppointmentDto updateAppointmentDto)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var appointment = await _context.Appointments.FindAsync(id);
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

            await _context.SaveChangesAsync();
            return Ok(appointment.ToAppointmentDto());
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> DeleteAppointment([FromRoute] int id)
        {
            var appointment = await _context.Appointments.FirstOrDefaultAsync(a => a.Id == id);
            if (appointment == null)
            {
                return NotFound($"Appointment with ID: {id} not found!");
            }

            _context.Appointments.Remove(appointment);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}