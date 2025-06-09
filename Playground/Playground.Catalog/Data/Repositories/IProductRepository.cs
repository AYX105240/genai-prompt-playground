using Playground.Catalog.Data;
using Playground.Catalog.Data.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Playground.Catalog.Data.Repositories
{
    public interface IProductRepository
    {
        Task<IEnumerable<ProductDto>> GetAllAsync();
        Task<ProductDto?> GetByIdAsync(int id);
        Task AddAsync(ProductDto product);
        Task UpdateAsync(ProductDto product);
        Task DeleteAsync(int id);
    }
}
