using Playground.Cart.Services;
using Playground.Cart.Data.DTOs;
using Playground.Cart.Data.Repositories;
using Moq;
using Xunit;
using System.Collections.Generic;
using System.Threading.Tasks;
using Playground.Cart.Data.Entities;

namespace Playground.Tests
{
    public class CartServiceTests
    {
        private readonly Mock<ICartRepository> _repoMock;
        private readonly CartService _service;

        public CartServiceTests()
        {
            _repoMock = new Mock<ICartRepository>();
            _service = new CartService(_repoMock.Object);
        }

        [Fact]
        public async Task Add_ShouldAddCartItemAsync()
        {
            // Arrange
            var cartItemDto = new CartItemDto { Id = 1, Name = "Item1", Quantity = 2 };

            _repoMock.Setup(r => r.AddCartItemAsync(It.IsAny<CartItemDto>())).ReturnsAsync(cartItemDto);

            // Act
            var result = await _service.AddCartItemAsync(cartItemDto);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(cartItemDto.Id, result.Id);
            _repoMock.Verify(r => r.AddCartItemAsync(It.IsAny<CartItemDto>()), Times.Once);
        }

        [Fact]
        public async Task GetAll_ShouldReturnCartItemsAsync()
        {
            // Arrange
            var items = new List<CartItemDto>
            {
                new CartItemDto { Id = 1, Name = "Item1", Quantity = 2 }
            };

            _repoMock.Setup(r => r.GetCartItemsAsync(It.IsAny<string>())).ReturnsAsync(items);

            // Act
            var result = await _service.GetCartItemsAsync("user1");

            // Assert
            Assert.NotNull(result);
            Assert.Single(result);
            Assert.Equal(items[0].Name, result.First().Name);
        }
    }
}
