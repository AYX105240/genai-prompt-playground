namespace Playground.Cart.Data.DTOs
{
    public class CartItemDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public int Quantity { get; set; }
        public decimal Price { get; set; } // Price per unit
        public string ProductId { get; set; } = string.Empty; // Reference to the product
        public string UserId { get; set; } = string.Empty; // User who owns the cart
        public DateTime AddedDate { get; set; } // Date when the item was added
        public string ImageUrl { get; set; } = string.Empty; // URL for product image
        public string? Size { get; set; } // Nullable field for size
        public string? Color { get; set; } // Nullable field for color
    }
}
