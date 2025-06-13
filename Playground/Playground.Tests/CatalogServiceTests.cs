using Playground.Catalog.Services;
using Playground.Catalog.Data.DTOs;
using Playground.Catalog.Data.Repositories;
using Moq;
using Xunit;
using System.Collections.Generic;
using System.Threading.Tasks;
using Playground.WishList.Services;

namespace Playground.Tests
{
    public class CatalogServiceTests
    {
        private readonly Mock<IProductRepository> _repoMock;
        private readonly Mock<IRabbitMQService> _rabbitMQServiceMock;
        private readonly ProductService _service;

        public CatalogServiceTests()
        {
            _repoMock = new Mock<IProductRepository>();
            _rabbitMQServiceMock = new Mock<IRabbitMQService>();
            _service = new ProductService(_repoMock.Object, _rabbitMQServiceMock.Object);
        }

        [Fact]
        public async Task Add_ShouldAddProductAsync()
        {
            // Arrange
            var productDto = new ProductDto { Id = 1, Name = "Product1", Price = 100.0m };

            _repoMock.Setup(r => r.AddAsync(It.IsAny<ProductDto>())).Returns(Task.CompletedTask);

            // Act
            await _service.AddAsync(new Playground.Catalog.Requests.ProductRequest
            {
                Name = productDto.Name,
                Price = productDto.Price
            });

            // Assert
            _repoMock.Verify(r => r.AddAsync(It.IsAny<ProductDto>()), Times.Once);
        }

        [Fact]
        public async Task GetAllProducts_ShouldReturnProductsAsync()
        {
            // Arrange
            var products = new List<ProductDto>
            {
                new ProductDto { Id = 1, Name = "Product1", Price = 100.0m }
            };

            _repoMock.Setup(r => r.GetAllAsync()).ReturnsAsync(products);

            // Act
            var result = await _service.GetAllAsync();

            // Assert
            Assert.NotNull(result);
            Assert.Equal(products.Count, result.Count());
        }
    }
}
