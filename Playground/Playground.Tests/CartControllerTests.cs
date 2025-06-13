using Playground.Cart.Controllers;
using Playground.Cart.Data.DTOs;
using Playground.Cart.Services;
using Moq;
using Xunit;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;

namespace Playground.Tests
{
    public class CartControllerTests
    {
        private readonly Mock<ICartService> _serviceMock;
        private readonly CartController _controller;

        public CartControllerTests()
        {
            _serviceMock = new Mock<ICartService>();
            _controller = new CartController(_serviceMock.Object);

            var user = new ClaimsPrincipal(new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.NameIdentifier, "user1")
            }));
            _controller.ControllerContext = new ControllerContext
            {
                HttpContext = new DefaultHttpContext { User = user }
            };
        }

        [Fact]
        public async Task Get_ShouldReturnCartItemsAsync()
        {
            // Arrange
            var userId = "user1";
            var items = new List<CartItemDto>
            {
                new CartItemDto { Id = 1, Name = "Item1", Quantity = 2 }
            };

            _serviceMock.Setup(s => s.GetCartItemsAsync(userId)).ReturnsAsync(items);

            // Act
            var result = await _controller.Get();
            var okResult = result.Result as OkObjectResult;

            // Assert
            Assert.NotNull(okResult);
            var cartItems = okResult.Value as IEnumerable<CartItemDto>;
            Assert.NotNull(cartItems);
            Assert.Single(cartItems);
        }
    }
}
