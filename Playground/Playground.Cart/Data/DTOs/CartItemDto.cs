namespace Playground.Cart.Data.DTOs
{
    public class CartItemDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public int Quantity { get; set; }
        public string UserId { get; set; } = string.Empty;
    }
}
