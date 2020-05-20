using Microsoft.EntityFrameworkCore.Migrations;

namespace DisasterReliefApplication.Migrations
{
    public partial class addRespond : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AmountNeeded",
                table: "Requests",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "status",
                table: "Requests",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AmountNeeded",
                table: "Requests");

            migrationBuilder.DropColumn(
                name: "status",
                table: "Requests");
        }
    }
}
