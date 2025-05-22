using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Scheduling_Backend.Data;
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
    }
}