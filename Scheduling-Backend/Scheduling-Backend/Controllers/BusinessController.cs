using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Scheduling_Backend.Data;
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
        public IActionResult GetBusinesses()
        {
            var businesses = _context.Businesses.Select(b => b.ToBusinessDto()).ToList();

            if (businesses == null || !businesses.Any())
            {
                return NotFound("No businesses found!");
            }
            return Ok(businesses);
        }

        [HttpGet("{id}")]
        public IActionResult GetBusinessById([FromRoute] int id)
        {
            var business = _context.Businesses.Find(id);

            if (business == null)
            {
                return NotFound($"Business with ID: {id} not found!");
            }
            return Ok(business.ToBusinessDto());
        }
    }
}