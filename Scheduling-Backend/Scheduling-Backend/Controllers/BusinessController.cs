using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Scheduling_Backend.Data;
using Scheduling_Backend.DTOs.Business;
using Scheduling_Backend.Mappers;

namespace Scheduling_Backend.Controllers
{
    [Route("api/businesses")]
    [ApiController]
    public class BusinessController : ControllerBase
    {
        private readonly AppDBContext _context;
        public BusinessController(AppDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetBusinesses()
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var businesses = await _context.Businesses.Include(c => c.Appointments).Select(b => b.ToBusinessDto()).ToListAsync();

            if (businesses == null || !businesses.Any())
            {
                return NotFound("No businesses found!");
            }
            return Ok(businesses);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetBusinessById([FromRoute] int id)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var business = await _context.Businesses.Include(c => c.Appointments).FirstOrDefaultAsync(b => b.Id == id);

            if (business == null)
            {
                return NotFound($"Business with ID: {id} not found!");
            }
            return Ok(business.ToBusinessDto());
        }

        [HttpPost]
        public async Task<IActionResult> CreateBusiness([FromBody] CreateBusinessDto createBusinessDto)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (createBusinessDto == null)
            {
                return BadRequest("Invalid business data!");
            }

            var business = createBusinessDto.ToBusinessFromCreateDto();
            await _context.Businesses.AddAsync(business);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetBusinessById), new { id = business.Id }, business.ToBusinessDto());
        }

        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> UpdateBusiness([FromRoute] int id, [FromBody] UpdateBusinessDto updateBusinessDto)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var business = await _context.Businesses.FirstOrDefaultAsync(b => b.Id == id);
            if (business == null)
            {
                return NotFound($"Business with ID: {id} not found!");
            }
            if (updateBusinessDto.Name != null)
            {
                business.Name = updateBusinessDto.Name;
            }
            if (updateBusinessDto.Email != null)
            {
                business.Email = updateBusinessDto.Email;
            }
            if (updateBusinessDto.Phone != null)
            {
                business.Phone = updateBusinessDto.Phone;
            }
            if (updateBusinessDto.Address != null)
            {
                business.Address = updateBusinessDto.Address;
            }
            if (updateBusinessDto.Description != null)
            {
                business.Description = updateBusinessDto.Description;
            }

            await _context.SaveChangesAsync();
            return Ok(business.ToBusinessDto());
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> DeleteBusiness([FromRoute] int id)
        {
            var business = await _context.Businesses.FindAsync(id);
            if (business == null)
            {
                return NotFound($"Business with ID: {id} not found!");
            }

            _context.Businesses.Remove(business);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}