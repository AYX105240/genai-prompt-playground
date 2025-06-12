using Microsoft.EntityFrameworkCore;
using Playground.Catalog.Data.DTOs;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Playground.Catalog.Data.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly CatalogDbContext _context;
        public ProductRepository(CatalogDbContext context)
        {
            _context = context;
        }

        private Product MapToEntity(ProductDto dto)
        {
            return new Product
            {
                Id = dto.Id,
                Name = dto.Name,
                Price = dto.Price,
                Description = dto.Description,
                Category = dto.Category,
                ImageUrl = dto.ImageUrl
            };
        }

        private ProductDto MapToDto(Product entity)
        {
            return new ProductDto
            {
                Id = entity.Id,
                Name = entity.Name,
                Price = entity.Price,
                Description = entity.Description,
                Category = entity.Category,
                ImageUrl = entity.ImageUrl
            };
        }

        public async Task<IEnumerable<ProductDto>> GetAllAsync()
        {
            return await Task.FromResult(_context.Products.Select(MapToDto).ToList());
        }

        public async Task<ProductDto?> GetByIdAsync(int id)
        {
            var product = await Task.FromResult(_context.Products.Find(id));
            return product == null ? null : MapToDto(product);
        }

        public async Task AddAsync(ProductDto productDto)
        {
            var product = MapToEntity(productDto);
            _context.Products.Add(product);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(ProductDto productDto)
        {
            var product = MapToEntity(productDto);
            _context.Products.Update(product);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var product = _context.Products.Find(id);
            if (product != null)
            {
                _context.Products.Remove(product);
                await _context.SaveChangesAsync();
            }
        }
    }
}
