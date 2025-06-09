using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Playground.WishList.Data;
using Playground.WishList.Data.DTOs;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;

namespace Playground.WishList.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class WishListController : ControllerBase
    {
        private readonly WishListDbContext _db;
        public WishListController(WishListDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public ActionResult<IEnumerable<WishListItemDto>> Get()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null) return Unauthorized();
            return Ok(_db.WishListItems.Where(item => item.UserId == userId).ToList());
        }

        [HttpPost]
        public ActionResult<WishListItemDto> Add([FromBody] WishListItemDto item)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null) return Unauthorized();
            item.UserId = userId;
            _db.WishListItems.Add(item);
            _db.SaveChanges();
            return CreatedAtAction(nameof(Get), item);
        }

        [HttpDelete("{id}")]
        public IActionResult Remove(int id)
        {
            var entity = _db.WishListItems.Find(id);
            if (entity == null) return NotFound();
            _db.WishListItems.Remove(entity);
            _db.SaveChanges();
            return NoContent();
        }
    }
}
