using Playground.User.Data.DTOs;
using Playground.User.Data.Repositories;
using Playground.User.Requests;
using Playground.User.Responses;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using Microsoft.Extensions.Configuration;

namespace Playground.User.Services
{
    public interface IUserService
    {
        object Signup(SignupRequest request);
        LoginResponse? Login(LoginRequest request, IConfiguration config);
        IEnumerable<UserDto> GetAll();
        UserDto Add(UserDto user);
    }

    public class UserService : IUserService
    {
        private readonly IUserRepository _repo;
        public UserService(IUserRepository repo)
        {
            _repo = repo;
        }
        private static string HashPassword(string password)
        {
            if (string.IsNullOrEmpty(password)) return string.Empty;
            using var sha256 = SHA256.Create();
            var bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password.Trim()));
            return Convert.ToBase64String(bytes);
        }
        public object Signup(SignupRequest request)
        {
            if (_repo.EmailExists(request.Email))
                return null;
            var user = new UserDto
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                Email = request.Email,
                PasswordHash = HashPassword(request.Password)
            };
            _repo.Add(user);
            _repo.Save();
            return new { user.Id, user.FirstName, user.LastName, user.Email };
        }
        public LoginResponse? Login(LoginRequest request, IConfiguration config)
        {
            var user = _repo.GetByEmailAndPasswordHash(request.Username, HashPassword(request.Password));
            if (user == null) return null;
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, user.Name),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Role, "Admin")
            };

            var jwtKey = config["Jwt:Key"] ?? "SampleSuperSecretKey123!@#";
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var audiences = new[] { "cart_api", "catalog_api", "wishlist_api" };

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
        new Claim(ClaimTypes.Name, user.Name),
        new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
        new Claim(ClaimTypes.Role, "Admin")
    }),
                Issuer = config["Jwt:Issuer"] ?? "SampleIssuer",
                Audience = null, // <-- Set to null when using multiple audiences in payload
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = creds,
                Claims = new Dictionary<string, object>
    {
        { "aud", audiences } // 👈 Correct way to include multiple audiences
    }
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            Console.WriteLine("Generated Token: " + tokenString); // Logging the generated token

            return new LoginResponse
            {
                User = new UserInfo
                {
                    Id = user.Id,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Email = user.Email
                },
                Token = new JwtSecurityTokenHandler().WriteToken(token)
            };
        }
        public IEnumerable<UserDto> GetAll() => _repo.GetAll();
        public UserDto Add(UserDto user)
        {
            user.Id = 0;
            _repo.Add(user);
            _repo.Save();
            return user;
        }
    }
}
