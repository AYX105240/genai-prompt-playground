using Playground.Catalog.Data;
using Playground.Catalog.Data.Repositories;
using Playground.Catalog.Data.DTOs;
using Playground.Catalog.Requests;
using Playground.Catalog.Responses;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Playground.Catalog.Services
{
    public class ProductService
    {
        private readonly IProductRepository _repository;
        public ProductService(IProductRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<ProductResponse>> GetAllAsync()
        {
            var products = await _repository.GetAllAsync();
            return products.Select(p => new ProductResponse
            {
                Id = p.Id,
                Name = p.Name,
                Description = p.Description,
                Price = p.Price,
                ImageUrl = p.ImageUrl,
                Category = p.Category
            });
        }

        public async Task<ProductResponse?> GetByIdAsync(int id)
        {
            var product = await _repository.GetByIdAsync(id);
            if (product == null) return null;

            return new ProductResponse
            {
                Id = product.Id,
                Name = product.Name,
                Description = product.Description,
                Price = product.Price,
                ImageUrl = product.ImageUrl,
                Category = product.Category
            };
        }

        public async Task AddAsync(ProductRequest request)
        {
            var product = new ProductDto
            {
                Name = request.Name,
                Description = request.Description,
                Price = request.Price,
                ImageUrl = request.ImageUrl,
                Category = request.Category
            };
            await _repository.AddAsync(product);
        }

        public async Task UpdateAsync(ProductRequest request)
        {
            var product = new ProductDto
            {
                Id = request.Id,
                Name = request.Name,
                Description = request.Description,
                Price = request.Price,
                ImageUrl = request.ImageUrl,
                Category = request.Category
            };
            await _repository.UpdateAsync(product);
        }

        public async Task DeleteAsync(int id)
        {
            await _repository.DeleteAsync(id);
        }
    }
}
