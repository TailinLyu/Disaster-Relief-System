using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DisasterReliefApplication.Migrations
{
    public partial class updateRespond : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Respond",
                columns: table => new
                {
                    RespondId = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Category = table.Column<int>(nullable: true),
                    AmountDonored = table.Column<int>(nullable: false),
                    RespondDate = table.Column<DateTime>(nullable: false),
                    RequestFK = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Respond", x => x.RespondId);
                    table.ForeignKey(
                        name: "FK_Respond_DisasterEvents_RequestFK",
                        column: x => x.RequestFK,
                        principalTable: "DisasterEvents",
                        principalColumn: "EventId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Respond_RequestFK",
                table: "Respond",
                column: "RequestFK");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Respond");
        }
    }
}
