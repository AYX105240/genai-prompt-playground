using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace Playground.Catalog.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class CatalogController : ControllerBase
    {
        [HttpGet]
        public ActionResult<IEnumerable<string>> Get()
        {
            var userId = User.FindFirst("NameIdentifier")?.Value;
            if (userId == null) return Unauthorized();

            return Ok(new List<string> { "Item1", "Item2", "Item3" });
        }
    }
}