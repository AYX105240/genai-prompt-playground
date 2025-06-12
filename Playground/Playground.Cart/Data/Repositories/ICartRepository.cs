using Playground.Cart.Data.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Playground.Cart.Data.Repositories
{
    public interface ICartRepository
    {
        Task<IEnumerable<CartItemDto>> GetCartItemsAsync(string userId);
        Task<CartItemDto> AddCartItemAsync(CartItemDto item);
        Task<bool> RemoveCartItemAsync(int id, string userId);
        Task<bool> UpdateCartItemAsync(int id, CartItemDto item);
    }
}
