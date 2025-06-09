using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using Playground.Cart.Data;
using Playground.Cart.Data.DTOs;
using System.Security.Claims;

namespace Playground.Cart.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CartController : ControllerBase
    {
        private readonly CartDbContext _db;
        public CartController(CartDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public ActionResult<IEnumerable<CartItemDto>> Get()
        {
            var userId = User.FindFirst(ClaimTypes.Name)?.Value;
            if (userId == null) return Unauthorized();
            return Ok(_db.CartItems.Where(item => item.UserId == userId).ToList());
        }

        [HttpPost]
        public ActionResult<CartItemDto> Add([FromBody] CartItemDto item)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null) return Unauthorized();
            item.UserId = userId;
            _db.CartItems.Add(item);
            _db.SaveChanges();
            return CreatedAtAction(nameof(Get), item);
        }

        [HttpDelete("{id}")]
        public IActionResult Remove(int id)
        {
            var entity = _db.CartItems.Find(id);
            if (entity == null) return NotFound();
            _db.CartItems.Remove(entity);
            _db.SaveChanges();
            return NoContent();
        }
    }
}
