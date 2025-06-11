using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Scheduling_Backend.Data;
using Scheduling_Backend.DTOs.Business;
using Scheduling_Backend.DTOs.User;
using Scheduling_Backend.Interfaces;
using Scheduling_Backend.Models;

namespace Scheduling_Backend.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class UserAuthController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly ITokenService _tokenService;
        private readonly SignInManager<User> _signInManager;
        private readonly AppDBContext _context;
        public UserAuthController(UserManager<User> userManager, ITokenService tokenService, SignInManager<User> signInManager, AppDBContext context)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _signInManager = signInManager;
            _context = context;
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginUser([FromBody] UserLoginDto userLoginDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var user = await _userManager.Users
                    .Include(u => u.UserProfile)
                    .Include(u => u.BusinessProfile)
                    .FirstOrDefaultAsync(u => u.Email == userLoginDto.Email);
                if (user == null)
                {
                    return Unauthorized(new { message = "Invalid email or password!" });
                }

                var result = await _signInManager.CheckPasswordSignInAsync(user, userLoginDto.Password, false);
                if (!result.Succeeded)
                {
                    return Unauthorized(new { message = "Invalid email or password!" });
                }

                var token = await _tokenService.CreateToken(user);
                var cookieOptions = new CookieOptions
                {
                    HttpOnly = true,
                    Secure = false, // SET TO TRUE IN PRODUCTION
                    SameSite = SameSiteMode.Strict,
                    Expires = DateTime.Now.AddDays(7)
                };
                Response.Cookies.Append("token", token, cookieOptions);

                if (await _userManager.IsInRoleAsync(user, "User"))
                {
                    if (user.UserProfile == null)
                    {
                        return StatusCode(500, new { message = "UserProfile is not set for this user." });
                    }
                    return Ok(
                        new NewUserDto
                        {
                            Email = user.Email!,
                            FirstName = user.UserProfile.FirstName,
                            LastName = user.UserProfile.LastName,
                            PhoneNumber = user.PhoneNumber,
                            Role = "User"
                        }
                    );
                }
                if (await _userManager.IsInRoleAsync(user, "Business"))
                {
                    if (user.BusinessProfile == null)
                    {
                        return StatusCode(500, new { message = "BusinessProfile is not set for this user." });
                    }
                    return Ok(
                        new NewBusinessDto
                        {
                            BusinessEmail = user.Email!,
                            BusinessName = user.BusinessProfile.BusinessName,
                            BusinessPhone = user.PhoneNumber!,
                            BusinessAddress = user.BusinessProfile.BusinessAddress,
                            BusinessDescription = user.BusinessProfile.BusinessDescription,
                            Role = "Business"
                        }
                    );
                }
                return Unauthorized(new { message = "User is not registered as either User or Business!" });
            }
            catch (Exception e)
            {
                return StatusCode(500, new { message = $"Internal server error: {e.Message}" });
            }
        }

        [HttpPost("register/user")]
        public async Task<IActionResult> RegisterUser([FromBody] UserRegisterDto userRegisterDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    var firstError = ModelState.Values
                        .SelectMany(v => v.Errors)
                        .Select(e => e.ErrorMessage)
                        .FirstOrDefault();

                    return BadRequest(new { message = firstError ?? "Invalid input." });
                }

                if (userRegisterDto.Password != userRegisterDto.ConfirmPassword)
                {
                    return BadRequest(new { message = "Passwords do not match!" });
                }

                var user = new User
                {
                    UserName = userRegisterDto.Email,
                    Email = userRegisterDto.Email,
                    PhoneNumber = userRegisterDto.PhoneNumber,
                };

                var createdUser = await _userManager.CreateAsync(user, userRegisterDto.Password);
                if (createdUser.Succeeded)
                {
                    var roleResult = await _userManager.AddToRoleAsync(user, "User");
                    if (roleResult.Succeeded)
                    {
                        var userProfile = new UserProfile
                        {
                            UserId = user.Id,
                            FirstName = userRegisterDto.FirstName,
                            LastName = userRegisterDto.LastName
                        };

                        await _context.UserProfiles.AddAsync(userProfile);
                        await _context.SaveChangesAsync();

                        return Ok(
                            new NewUserDto
                            {
                                Email = user.Email!,
                                FirstName = user.UserProfile.FirstName,
                                LastName = user.UserProfile.LastName,
                                PhoneNumber = user.PhoneNumber!,
                                Role = "User"
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

        [HttpPost("register/business")]
        public async Task<IActionResult> RegisterBusiness([FromBody] BusinessRegisterDto businessRegisterDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                if (businessRegisterDto.Password != businessRegisterDto.ConfirmPassword)
                {
                    return BadRequest(new { message = "Passwords do not match!" });
                }

                var business = new User
                {
                    UserName = businessRegisterDto.Email,
                    Email = businessRegisterDto.Email,
                    PhoneNumber = businessRegisterDto.Phone,
                };
                var createdBusiness = await _userManager.CreateAsync(business, businessRegisterDto.Password);
                if (createdBusiness.Succeeded)
                {
                    var roleResult = await _userManager.AddToRoleAsync(business, "Business");
                    if (roleResult.Succeeded)
                    {
                        var businessProfile = new BusinessProfile
                        {
                            UserId = business.Id,
                            BusinessName = businessRegisterDto.Name,
                            BusinessAddress = businessRegisterDto.Address,
                            BusinessDescription = businessRegisterDto.Description
                        };

                        await _context.BusinessProfiles.AddAsync(businessProfile);
                        await _context.SaveChangesAsync();

                        return Ok(
                            new NewBusinessDto
                            {
                                BusinessEmail = business.Email,
                                BusinessName = business.BusinessProfile.BusinessName,
                                BusinessPhone = business.PhoneNumber,
                                BusinessAddress = business.BusinessProfile.BusinessAddress,
                                BusinessDescription = business.BusinessProfile.BusinessDescription,
                                Role = "Business"
                            }
                        );
                    }
                    else
                    {
                        return StatusCode(500, new { message = roleResult.Errors.Select(e => e.Description) });
                    }
                }
                else
                {
                    return StatusCode(500, new { message = createdBusiness.Errors.Select(e => e.Description) });
                }
            }
            catch (Exception e)
            {
                return StatusCode(500, $"Internal server error: {e.Message}");
            }
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            Response.Cookies.Delete("token");
            try
            {
                await _signInManager.SignOutAsync();
                return Ok(new { message = "Logged out successfully." });
            }
            catch (Exception e)
            {
                return StatusCode(500, new { message = $"Internal server error: {e.Message}" });
            }
        }

        [Authorize]
        [HttpGet("check-session")]
        public async Task<IActionResult> CheckSession()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var email = User.FindFirst(ClaimTypes.Email)?.Value;
            var role = User.FindFirst(ClaimTypes.Role)?.Value;

            if (userId == null)
            {
                return Unauthorized(new { message = "Invalid token or session expired." });
            }

            return Ok(new
            {
                UserId = userId,
                Email = email,
                Role = role
            });
        }
    }
}