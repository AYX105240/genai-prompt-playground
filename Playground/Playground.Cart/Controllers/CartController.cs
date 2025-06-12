using Microsoft.AspNetCore.Mvc;
using Playground.Cart.Services;
using Playground.Cart.Data.DTOs;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Playground.Cart.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CartController : ControllerBase
    {
        private readonly ICartService _service;
        public CartController(ICartService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CartItemDto>>> Get()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null) return Unauthorized();
            var items = await _service.GetCartItemsAsync(userId);
            return Ok(items);
        }

        [HttpPost]
        public async Task<ActionResult<CartItemDto>> Add([FromBody] CartItemDto item)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null) return Unauthorized();
            item.UserId = userId;
            var addedItem = await _service.AddCartItemAsync(item);
            return CreatedAtAction(nameof(Get), new { id = addedItem.Id }, addedItem);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Remove(int id)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null) return Unauthorized();
            var success = await _service.RemoveCartItemAsync(id, userId);
            if (!success) return NotFound();
            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] CartItemDto item)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null) return Unauthorized();
            item.UserId = userId;
            var success = await _service.UpdateCartItemAsync(id, item);
            if (!success) return NotFound();
            return NoContent();
        }
    }
}
