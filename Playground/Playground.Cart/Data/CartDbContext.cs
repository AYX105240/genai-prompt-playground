using Microsoft.EntityFrameworkCore;
using Playground.Cart.Data.DTOs;

namespace Playground.Cart.Data
{
    public class CartDbContext : DbContext
    {
        public CartDbContext(DbContextOptions<CartDbContext> options) : base(options) { }
        public DbSet<CartItemDto> CartItems { get; set; }
    }
}
