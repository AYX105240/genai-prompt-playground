using Playground.Cart.Data.DTOs;
using Playground.Cart.Data.Entities;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Playground.Cart.Data.Repositories
{
    public class CartRepository : ICartRepository
    {
        private readonly CartDbContext _context;

        public CartRepository(CartDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<CartItemDto>> GetCartItemsAsync(string userId)
        {
            return await Task.FromResult(_context.CartItems
                .Where(item => item.UserId == userId)
                .Select(item => new CartItemDto
                {
                    Id = item.Id,
                    Name = item.Name,
                    Quantity = item.Quantity,
                    Price = item.Price,
                    ProductId = item.ProductId,
                    UserId = item.UserId,
                    AddedDate = item.AddedDate,
                    ImageUrl = item.ImageUrl,
                    Size = item.Size,
                    Color = item.Color
                }).ToList());
        }

        public async Task<CartItemDto> AddCartItemAsync(CartItemDto item)
        {
            var entity = new CartItem
            {
                Name = item.Name,
                Quantity = item.Quantity,
                Price = item.Price,
                ProductId = item.ProductId,
                UserId = item.UserId,
                AddedDate = item.AddedDate,
                ImageUrl = item.ImageUrl,
                Size = item.Size,
                Color = item.Color
            };
            _context.CartItems.Add(entity);
            await _context.SaveChangesAsync();
            item.Id = entity.Id;
            return item;
        }

        public async Task<bool> RemoveCartItemAsync(int id, string userId)
        {
            var entity = _context.CartItems.FirstOrDefault(item => item.Id == id && item.UserId == userId);
            if (entity == null) return false;
            _context.CartItems.Remove(entity);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UpdateCartItemAsync(int id, CartItemDto item)
        {
            var entity = _context.CartItems.FirstOrDefault(cartItem => cartItem.Id == id && cartItem.UserId == item.UserId);
            if (entity == null) return false;

            if (item.Quantity != default) entity.Quantity = item.Quantity;
            if (!string.IsNullOrEmpty(item.Name)) entity.Name = item.Name;
            if (item.Price != default) entity.Price = item.Price;
            if (!string.IsNullOrEmpty(item.ProductId)) entity.ProductId = item.ProductId;
            if (!string.IsNullOrEmpty(item.ImageUrl)) entity.ImageUrl = item.ImageUrl;
            if (!string.IsNullOrEmpty(item.Size)) entity.Size = item.Size;
            if (!string.IsNullOrEmpty(item.Color)) entity.Color = item.Color;

            await _context.SaveChangesAsync();
            return true;
        }
    }
}
