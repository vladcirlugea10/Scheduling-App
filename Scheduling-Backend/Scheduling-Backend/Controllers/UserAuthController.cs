using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Scheduling_Backend.DTOs.User;
using Scheduling_Backend.Interfaces;
using Scheduling_Backend.Models;

namespace Scheduling_Backend.Controllers
{
    [Route("api/userauth")]
    [ApiController]
    public class UserAuthController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly ITokenService _tokenService;
        private readonly SignInManager<User> _signInManager;
        public UserAuthController(UserManager<User> userManager, ITokenService tokenService, SignInManager<User> signInManager)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _signInManager = signInManager;
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginUser([FromBody] UserLoginDto userLoginDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _userManager.Users.FirstOrDefaultAsync(u => u.Email == userLoginDto.Email);
            if (user == null)
            {
                return Unauthorized("Username not found!");
            }

            var result = await _signInManager.CheckPasswordSignInAsync(user, userLoginDto.Password, false);
            if (!result.Succeeded)
            {
                return Unauthorized("Invalid email or password!");
            }

            return Ok(
                new NewUserDto
                {
                    Email = user.Email,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    PhoneNumber = user.PhoneNumber,
                    Token = _tokenService.CreateToken(user)
                }
            );
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser([FromBody] UserRegisterDto userRegisterDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var user = new User
                {
                    UserName = userRegisterDto.Email,
                    FirstName = userRegisterDto.FirstName,
                    LastName = userRegisterDto.LastName,
                    Email = userRegisterDto.Email,
                    PhoneNumber = userRegisterDto.PhoneNumber,
                };

                var createdUser = await _userManager.CreateAsync(user, userRegisterDto.Password);
                if (createdUser.Succeeded)
                {
                    var roleResult = await _userManager.AddToRoleAsync(user, "User");
                    if (roleResult.Succeeded)
                    {
                        return Ok(
                            new NewUserDto
                            {
                                Email = user.Email,
                                FirstName = user.FirstName,
                                LastName = user.LastName,
                                PhoneNumber = user.PhoneNumber,
                                Token = _tokenService.CreateToken(user)
                            }
                        );
                    }
                    else
                    {
                        return StatusCode(500, roleResult.Errors.Select(e => e.Description));
                    }
                }
                else
                {
                    return StatusCode(500, createdUser.Errors.Select(e => e.Description));
                }
            }
            catch (Exception e)
            {
                return StatusCode(500, $"Internal server error: {e.Message}");
            }
        }
    }
}