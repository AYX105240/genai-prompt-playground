namespace Playground.Cart.Data.Entities
{
    public class CartItem
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public string ProductId { get; set; } = string.Empty;
        public string UserId { get; set; } = string.Empty;
        public DateTime AddedDate { get; set; }
        public string ImageUrl { get; set; } = string.Empty;
        public string? Size { get; set; }
        public string? Color { get; set; }
    }
}
