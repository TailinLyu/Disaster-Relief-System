using Microsoft.EntityFrameworkCore.Migrations;

namespace DisasterReliefApplication.Migrations
{
    public partial class reviseRespond2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AmountDonored",
                table: "Responds");

            migrationBuilder.DropColumn(
                name: "Category",
                table: "Responds");

            migrationBuilder.AddColumn<int>(
                name: "AmountDonated",
                table: "Responds",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Requests_DisasterEventFK",
                table: "Requests",
                column: "DisasterEventFK");

            migrationBuilder.AddForeignKey(
                name: "FK_Requests_DisasterEvents_DisasterEventFK",
                table: "Requests",
                column: "DisasterEventFK",
                principalTable: "DisasterEvents",
                principalColumn: "EventId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Requests_DisasterEvents_DisasterEventFK",
                table: "Requests");

            migrationBuilder.DropIndex(
                name: "IX_Requests_DisasterEventFK",
                table: "Requests");

            migrationBuilder.DropColumn(
                name: "AmountDonated",
                table: "Responds");

            migrationBuilder.AddColumn<int>(
                name: "AmountDonored",
                table: "Responds",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Category",
                table: "Responds",
                type: "int",
                nullable: true);
        }
    }
}
