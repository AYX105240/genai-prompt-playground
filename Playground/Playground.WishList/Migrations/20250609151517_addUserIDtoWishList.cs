using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Playground.WishList.Migrations
{
    /// <inheritdoc />
    public partial class addUserIDtoWishList : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "WishListItems",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserId",
                table: "WishListItems");
        }
    }
}
