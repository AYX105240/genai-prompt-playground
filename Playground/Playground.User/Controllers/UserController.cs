using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Security.Cryptography;
using Microsoft.EntityFrameworkCore;
using Playground.User.Data;
using Playground.User.Data.DTOs;
using Playground.User.Requests;
using Playground.User.Responses;
using Playground.User.Services;
using Playground.User.Data.Repositories;

namespace Playground.User.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IConfiguration _config;
        public UserController(IUserService userService, IConfiguration config)
        {
            _userService = userService;
            _config = config;
        }

        [AllowAnonymous]
        [HttpPost("signup")]
        public IActionResult Signup([FromBody] SignupRequest request)
        {
            var result = _userService.Signup(request);
            if (result == null)
                return Conflict("Email already exists");
            return Ok(result);
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            var response = _userService.Login(request, _config);
            if (response == null)
                return Unauthorized();
            return Ok(response);
        }

        [HttpGet]
        public ActionResult<IEnumerable<UserDto>> Get()
        {
            return Ok(_userService.GetAll());
        }

        [HttpPost]
        public ActionResult<UserDto> Post([FromBody] UserDto user)
        {
            var created = _userService.Add(user);
            return CreatedAtAction(nameof(Get), new { id = created.Id }, created);
        }
    }
}
