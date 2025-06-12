using Microsoft.EntityFrameworkCore;
using Playground.WishList.Data.Entities;

namespace Playground.WishList.Data
{
    public class WishListDbContext : DbContext
    {
        public WishListDbContext(DbContextOptions<WishListDbContext> options) : base(options) { }
        public DbSet<WishListItem> WishListItems { get; set; }
    }
}
