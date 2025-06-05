using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace Playground.User.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private static readonly List<UserDto> Users = new List<UserDto>
        {
            new UserDto { Id = 1, Name = "Alice" },
            new UserDto { Id = 2, Name = "Bob" }
        };

        [HttpGet]
        public ActionResult<IEnumerable<UserDto>> Get()
        {
            return Ok(Users);
        }

        [HttpPost]
        public ActionResult<UserDto> Post([FromBody] UserDto user)
        {
            user.Id = Users.Count + 1;
            Users.Add(user);
            return CreatedAtAction(nameof(Get), new { id = user.Id }, user);
        }
    }

    public class UserDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
    }
}
