using Microsoft.EntityFrameworkCore.Migrations;

namespace DisasterReliefApplication.Migrations
{
    public partial class reviseRespond : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Requests_DisasterEvents_DisasterEventFK",
                table: "Requests");

            migrationBuilder.DropForeignKey(
                name: "FK_Respond_DisasterEvents_RequestFK",
                table: "Respond");

            migrationBuilder.DropIndex(
                name: "IX_Requests_DisasterEventFK",
                table: "Requests");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Respond",
                table: "Respond");

            migrationBuilder.DropIndex(
                name: "IX_Respond_RequestFK",
                table: "Respond");

            migrationBuilder.RenameTable(
                name: "Respond",
                newName: "Responds");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Responds",
                table: "Responds",
                column: "RespondId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Responds",
                table: "Responds");

            migrationBuilder.RenameTable(
                name: "Responds",
                newName: "Respond");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Respond",
                table: "Respond",
                column: "RespondId");

            migrationBuilder.CreateIndex(
                name: "IX_Requests_DisasterEventFK",
                table: "Requests",
                column: "DisasterEventFK");

            migrationBuilder.CreateIndex(
                name: "IX_Respond_RequestFK",
                table: "Respond",
                column: "RequestFK");

            migrationBuilder.AddForeignKey(
                name: "FK_Requests_DisasterEvents_DisasterEventFK",
                table: "Requests",
                column: "DisasterEventFK",
                principalTable: "DisasterEvents",
                principalColumn: "EventId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Respond_DisasterEvents_RequestFK",
                table: "Respond",
                column: "RequestFK",
                principalTable: "DisasterEvents",
                principalColumn: "EventId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
