using Playground.User.Data.DTOs;
using System.Collections.Generic;
using System.Linq;

namespace Playground.User.Data.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly UserDbContext _db;
        public UserRepository(UserDbContext db)
        {
            _db = db;
        }
        public UserDto? GetByEmail(string email) => _db.Users.FirstOrDefault(u => u.Email == email);
        public UserDto? GetByEmailAndPasswordHash(string email, string passwordHash) => _db.Users.FirstOrDefault(u => u.Email == email && u.PasswordHash == passwordHash);
        public bool EmailExists(string email) => _db.Users.Any(u => u.Email == email);
        public void Add(UserDto user) => _db.Users.Add(user);
        public IEnumerable<UserDto> GetAll() => _db.Users.ToList();
        public void Save() => _db.SaveChanges();
    }
}
