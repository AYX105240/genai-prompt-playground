namespace Playground.User.Responses
{
    public class LoginResponse
    {
        public UserInfo User { get; set; } = default!;
        public string Token { get; set; } = string.Empty;
    }

    public class UserInfo
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Role { get; set; } = "Viewer";
    }
}
