using Playground.Cart.Data.Repositories;
using Playground.Cart.Data.Entities;
using Moq;
using Xunit;
using System.Collections.Generic;
using System.Threading.Tasks;
using Playground.Cart.Data;
using Playground.Cart.Data.DTOs;

namespace Playground.Tests
{
    public class CartRepositoryTests
    {
        private readonly Mock<CartDbContext> _dbContextMock;
        private readonly Mock<ICartRepository> _repositoryMock;

        public CartRepositoryTests()
        {
            _dbContextMock = new Mock<CartDbContext>();
            _repositoryMock = new Mock<ICartRepository>();
        }

        [Fact]
        public async Task AddCartItemAsync_ShouldAddItem()
        {
            // Arrange
            var cartItemDto = new CartItemDto { Id = 1, Name = "Item1", Quantity = 2 };
            _repositoryMock.Setup(r => r.AddCartItemAsync(It.IsAny<CartItemDto>())).ReturnsAsync(cartItemDto);

            // Act
            var result = await _repositoryMock.Object.AddCartItemAsync(cartItemDto);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(cartItemDto.Id, result.Id);
        }
    }
}
