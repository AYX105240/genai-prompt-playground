using Playground.User.Services;
using Playground.User.Data.DTOs;
using Playground.User.Data.Repositories;
using Moq;
using Xunit;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;

namespace Playground.Tests
{
    public class UserServiceTests
    {
        private readonly Mock<IUserRepository> _repoMock;
        private readonly Mock<IConfiguration> _configMock;
        private readonly UserService _service;

        public UserServiceTests()
        {
            _repoMock = new Mock<IUserRepository>();
            _configMock = new Mock<IConfiguration>();
            _service = new UserService(_repoMock.Object, _configMock.Object);
        }

        [Fact]
        public void Signup_ShouldAddUser()
        {
            var signupRequest = new Playground.User.Requests.SignupRequest { FirstName = "John", LastName = "Doe", Email = "john.doe@example.com" };
            _repoMock.Setup(r => r.Add(It.IsAny<Playground.User.Data.DTOs.UserDto>())).Verifiable();

            _service.Signup(signupRequest);

            _repoMock.Verify(r => r.Add(It.IsAny<Playground.User.Data.DTOs.UserDto>()), Times.Once);
        }

        [Fact]
        public void GetAllUsers_ShouldReturnUsers()
        {
            var users = new List<Playground.User.Data.DTOs.UserDto>
            {
                new Playground.User.Data.DTOs.UserDto { Id = 1, FirstName = "John", LastName = "Doe", Email = "john.doe@example.com" }
            };

            _repoMock.Setup(r => r.GetAll()).Returns(users);

            var result = _service.GetAll();

            Assert.NotNull(result);
            Assert.Equal(users.Count, result.Count());
            Assert.Equal(users[0].Email, result.First().Email);
        }
    }
}
