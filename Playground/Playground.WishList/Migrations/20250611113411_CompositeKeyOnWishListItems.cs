using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Playground.WishList.Migrations
{
    /// <inheritdoc />
    public partial class CompositeKeyOnWishListItems : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "WishListItems",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<decimal>(
                name: "Price",
                table: "WishListItems",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "ProductName",
                table: "WishListItems",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "WishListItems");

            migrationBuilder.DropColumn(
                name: "Price",
                table: "WishListItems");

            migrationBuilder.DropColumn(
                name: "ProductName",
                table: "WishListItems");
        }
    }
}
