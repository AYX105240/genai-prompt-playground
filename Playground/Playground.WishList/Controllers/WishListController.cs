using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.JsonWebTokens;
using Playground.WishList.Data.DTOs;
using Playground.WishList.Requests;
using Playground.WishList.Services;
using System.Collections.Generic;
using System.Security.Claims;

namespace Playground.WishList.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class WishListController : ControllerBase
    {
        private readonly IWishListService _service;

        public WishListController(IWishListService service)
        {
            _service = service;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value; // Extract userId from claims
            if (string.IsNullOrEmpty(userId)) return Unauthorized();

            var items = _service.GetAll(userId);
            return Ok(items);
        }

        // Updated Add method to use WishListItemRequest
        [HttpPost]
        public IActionResult Add([FromBody] WishListItemRequest request)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value; // Extract userId from claims
            if (string.IsNullOrEmpty(userId)) return Unauthorized();

            var item = _service.Add(request.ProductId, userId, request.ProductName, request.ImageUrl, request.Price);
            return CreatedAtAction(nameof(Get), new { id = item.Id }, item);
        }

        [HttpDelete("{id}")]
        public IActionResult Remove(int id)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value; // Extract userId from claims
            if (string.IsNullOrEmpty(userId)) return Unauthorized();

            _service.Remove(id);
            return NoContent();
        }
    }
}
