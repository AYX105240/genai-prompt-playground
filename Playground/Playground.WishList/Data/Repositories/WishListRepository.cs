using Playground.WishList.Data.Entities;
using System.Collections.Generic;
using System.Linq;

namespace Playground.WishList.Data.Repositories
{
    public interface IWishListRepository
    {
        IEnumerable<WishListItem> GetAll(string userId);
        IEnumerable<WishListItem> GetAll(); // Method to retrieve all wish list items
        WishListItem Add(WishListItem item);
        void Remove(int id);
        void Save();
    }

    public class WishListRepository : IWishListRepository
    {
        private readonly WishListDbContext _context;

        public WishListRepository(WishListDbContext context)
        {
            _context = context;
        }

        public IEnumerable<WishListItem> GetAll(string userId)
        {
            return _context.WishListItems.Where(item => item.UserId == userId).ToList();
        }

        // Method to retrieve all wish list items regardless of user
        public IEnumerable<WishListItem> GetAll()
        {
            return _context.WishListItems.ToList();
        }

        // Refactored Add method to accept product details
        public WishListItem Add(WishListItem item)
        {
            _context.WishListItems.Add(item);
            return item;
        }

        public void Remove(int id)
        {
            var item = _context.WishListItems.Find(id);
            if (item != null)
            {
                _context.WishListItems.Remove(item);
            }
        }

        public void Save()
        {
            _context.SaveChanges();
        }
    }
}
