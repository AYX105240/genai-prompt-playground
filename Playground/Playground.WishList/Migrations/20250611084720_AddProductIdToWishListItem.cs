using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Playground.WishList.Migrations
{
    /// <inheritdoc />
    public partial class AddProductIdToWishListItem : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ProductId",
                table: "WishListItems",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProductId",
                table: "WishListItems");
        }
    }
}
