using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
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
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var businesses = await _context.Users
                .Include(u => u.BusinessProfile)
                    .ThenInclude(bp => bp!.Appointments)
                .Include(u => u.BusinessProfile)
                    .ThenInclude(bp => bp!.User)
                .Where(u => u.BusinessProfile != null)
                .Select(u => u.BusinessProfile!.ToBusinessDto())
                .ToListAsync();

            if (businesses == null || businesses.Count == 0)
            {
                return NotFound("No businesses found!");
            }
            return Ok(businesses);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBusinessById([FromRoute] string id)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var business = await _context.Users
                .Include(u => u.BusinessProfile)
                .Include(u => u.BusinessProfile.Appointments)
                .FirstOrDefaultAsync(u => u.Id == id && u.BusinessProfile != null);

            if (business == null)
            {
                return NotFound($"Business with ID: {id} not found!");
            }
            return Ok(business.BusinessProfile!.ToBusinessDto());
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdateBusiness([FromRoute] string id, [FromBody] UpdateBusinessDto updateBusinessDto)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var business = await _context.Users
                .Include(u => u.BusinessProfile)
                .FirstOrDefaultAsync(u => u.Id == id && u.BusinessProfile != null);
            if (business == null)
            {
                return NotFound($"Business with ID: {id} not found!");
            }
            if (updateBusinessDto.BusinessName != null)
            {
                business.BusinessProfile!.BusinessName = updateBusinessDto.BusinessName;
            }
            if (updateBusinessDto.BusinessEmail != null)
            {
                business.Email = updateBusinessDto.BusinessEmail;
            }
            if (updateBusinessDto.BusinessPhone != null)
            {
                business.PhoneNumber = updateBusinessDto.BusinessPhone;
            }
            if (updateBusinessDto.BusinessAddress != null)
            {
                business.BusinessProfile!.BusinessAddress = updateBusinessDto.BusinessAddress;
            }
            if (updateBusinessDto.BusinessDescription != null)
            {
                business.BusinessProfile!.BusinessDescription = updateBusinessDto.BusinessDescription;
            }

            await _context.SaveChangesAsync();
            return Ok(business.BusinessProfile!.ToBusinessDto());
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteBusiness([FromRoute] string id)
        {
            var business = await _context.Users
                .Include(u => u.BusinessProfile)
                .FirstOrDefaultAsync(u => u.Id == id && u.BusinessProfile != null);
            if (business == null)
            {
                return NotFound($"Business with ID: {id} not found!");
            }

            _context.Users.Remove(business);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}