using Playground.WishList.Data.DTOs;
using Playground.WishList.Data.Entities;
using Playground.WishList.Data.Repositories;
using System.Collections.Generic;
using System.Linq;

namespace Playground.WishList.Services
{
    public interface IWishListService
    {
        IEnumerable<WishListItemDto> GetAll(string userId);
        WishListItemDto Add(int productId, string userId, string productName, string imageUrl, decimal price);
        void Remove(int id);
    }

    public class WishListService : IWishListService
    {
        private readonly IWishListRepository _repo;
        private readonly IRabbitMQService _rabbitMQService;

        public WishListService(IWishListRepository repo, IRabbitMQService rabbitMQService)
        {
            _repo = repo;
            _rabbitMQService = rabbitMQService;

            // Subscribe to product updates
            _rabbitMQService.SubscribeToProductUpdates(OnProductUpdate);
        }

        public IEnumerable<WishListItemDto> GetAll(string userId)
        {
            return _repo.GetAll(userId).Select(item => new WishListItemDto
            {
                Id = item.Id,
                ProductId = item.ProductId,
                UserId = item.UserId,
                ProductName = item.ProductName,
                ImageUrl = item.ImageUrl,
                Price = item.Price
            });
        }

        // Refactored Add method to accept product details
        public WishListItemDto Add(int productId, string userId, string productName, string imageUrl, decimal price)
        {
            if (_repo.GetAll(userId).Any(item => item.ProductId == productId))
            {
                throw new InvalidOperationException("Duplicate wishlist item detected.");
            }

            var item = new WishListItem
            {
                ProductId = productId,
                UserId = userId,
                ProductName = productName,
                ImageUrl = imageUrl,
                Price = price
            };
            _repo.Add(item);
            _repo.Save();

            return new WishListItemDto
            {
                Id = item.Id,
                ProductId = item.ProductId,
                UserId = item.UserId,
                ProductName = item.ProductName,
                ImageUrl = item.ImageUrl,
                Price = item.Price
            };
        }

        public void Remove(int id)
        {
            _repo.Remove(id);
            _repo.Save();
        }

        private void OnProductUpdate(ProductUpdateEvent productUpdate)
        {
            var items = _repo.GetAll().Where(item => item.ProductId == productUpdate.ProductId);
            foreach (var item in items)
            {
                item.ProductName = productUpdate.Name;
                item.ImageUrl = productUpdate.ImageUrl;
                item.Price = productUpdate.Price;
            }
            _repo.Save();
        }
    }

    public class ProductDetailsDto
    {
        public string Name { get; set; } = string.Empty;
        public string ImageUrl { get; set; } = string.Empty;
        public decimal Price { get; set; }
    }
}
