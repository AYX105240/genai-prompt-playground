using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Playground.WishList.Migrations
{
    /// <inheritdoc />
    public partial class UpdateWishListSchema : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "WishListItems");

            migrationBuilder.DropColumn(
                name: "Quantity",
                table: "WishListItems");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "WishListItems",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "Quantity",
                table: "WishListItems",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
