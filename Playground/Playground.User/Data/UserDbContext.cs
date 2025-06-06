using Microsoft.EntityFrameworkCore;
using Playground.User.Data.DTOs;

namespace Playground.User.Data
{
    public class UserDbContext : DbContext
    {
        public UserDbContext(DbContextOptions<UserDbContext> options) : base(options) { }
        public DbSet<UserDto> Users { get; set; }
    }
}
