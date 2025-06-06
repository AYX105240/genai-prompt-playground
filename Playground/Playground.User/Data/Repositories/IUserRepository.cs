using Playground.User.Data.DTOs;
using System.Collections.Generic;

namespace Playground.User.Data.Repositories
{
    public interface IUserRepository
    {
        UserDto? GetByEmail(string email);
        UserDto? GetByEmailAndPasswordHash(string email, string passwordHash);
        bool EmailExists(string email);
        void Add(UserDto user);
        IEnumerable<UserDto> GetAll();
        void Save();
    }
}
