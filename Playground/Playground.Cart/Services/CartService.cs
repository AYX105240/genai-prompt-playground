using Playground.Cart.Data;
using Playground.Cart.Data.DTOs;
using Playground.Cart.Data.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Playground.Cart.Services
{
    public class CartService : ICartService
    {
        private readonly ICartRepository _repository;

        public CartService(ICartRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<CartItemDto>> GetCartItemsAsync(string userId)
        {
            return await _repository.GetCartItemsAsync(userId);
        }

        public async Task<CartItemDto> AddCartItemAsync(CartItemDto item)
        {
            return await _repository.AddCartItemAsync(item);
        }

        public async Task<bool> RemoveCartItemAsync(int id, string userId)
        {
            return await _repository.RemoveCartItemAsync(id, userId);
        }

        public async Task<bool> UpdateCartItemAsync(int id, CartItemDto item)
        {
            return await _repository.UpdateCartItemAsync(id, item);
        }
    }
}
