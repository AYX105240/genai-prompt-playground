using Playground.WishList.Services;
using Playground.WishList.Data.DTOs;
using Playground.WishList.Data.Repositories;
using Moq;
using Xunit;
using System.Collections.Generic;
using System.Linq;

namespace Playground.Tests
{
    public class WishListServiceTests
    {
        private readonly Mock<IWishListRepository> _repoMock;
        private readonly Mock<IRabbitMQService> _rabbitMQServiceMock = new Mock<IRabbitMQService>();
        private readonly WishListService _service;

        public WishListServiceTests()
        {
            _repoMock = new Mock<IWishListRepository>();
            _service = new WishListService(_repoMock.Object, _rabbitMQServiceMock.Object);
        }

        [Fact]
        public void Add_ShouldAddWishListItem()
        {
            // Arrange
            var wishListItemDto = new Playground.WishList.Data.DTOs.WishListItemDto { ProductId = 1, UserId = "user1", ProductName = "Product1", Price = 100.0m };
            _repoMock.Setup(r => r.Add(It.IsAny<Playground.WishList.Data.Entities.WishListItem>())).Returns(new Playground.WishList.Data.Entities.WishListItem { Id = 1, ProductId = 1, UserId = "user1", ProductName = "Product1", Price = 100.0m });

            // Act
            var result = _service.Add(1, "user1", "Product1", "imageUrl", 100.0m);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(1, result.ProductId);
            _repoMock.Verify(r => r.Add(It.IsAny<Playground.WishList.Data.Entities.WishListItem>()), Times.Once);
        }

        [Fact]
        public void GetAll_ShouldReturnWishListItems()
        {
            // Arrange
            var userId = "user1";
            var items = new List<Playground.WishList.Data.Entities.WishListItem>
            {
                new Playground.WishList.Data.Entities.WishListItem { Id = 1, ProductId = 1, UserId = userId, ProductName = "Product1", ImageUrl = "http://example.com/image.jpg", Price = 100.0m }
            };

            _repoMock.Setup(r => r.GetAll(userId)).Returns(items);

            // Act
            var result = _service.GetAll(userId).ToList();

            // Assert
            Assert.NotNull(result);
            Assert.Single(result);
            Assert.Equal(items[0].ProductId, result[0].ProductId);
        }
    }
}
