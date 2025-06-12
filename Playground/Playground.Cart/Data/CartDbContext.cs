using Microsoft.EntityFrameworkCore;
using Playground.Cart.Data.Entities;

namespace Playground.Cart.Data
{
    public class CartDbContext : DbContext
    {
        public CartDbContext(DbContextOptions<CartDbContext> options) : base(options) { }
        public DbSet<CartItem> CartItems { get; set; }
    }
}
