namespace Playground.User.Data.DTOs
{
    public class UserDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public string Name => $"{FirstName} {LastName}";
        public string Role { get; set; } = "Viewer";
    }
}
