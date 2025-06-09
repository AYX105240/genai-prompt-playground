namespace Playground.WishList.Data.DTOs
{
    public class WishListItemDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public int Quantity { get; set; }
        public string UserId { get; set; } = string.Empty;
    }
}
