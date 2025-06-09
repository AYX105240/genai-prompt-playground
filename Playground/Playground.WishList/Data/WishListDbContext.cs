using Microsoft.EntityFrameworkCore;
using Playground.WishList.Data.DTOs;

namespace Playground.WishList.Data
{
    public class WishListDbContext : DbContext
    {
        public WishListDbContext(DbContextOptions<WishListDbContext> options) : base(options) { }
        public DbSet<WishListItemDto> WishListItems { get; set; }
    }
}
