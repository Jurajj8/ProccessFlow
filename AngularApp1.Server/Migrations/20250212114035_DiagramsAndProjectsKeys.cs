using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AngularApp1.Server.Migrations
{
    /// <inheritdoc />
    public partial class DiagramsAndProjectsKeys : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ProjectID",
                table: "Diagrams",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Diagrams_ProjectID",
                table: "Diagrams",
                column: "ProjectID");

            migrationBuilder.AddForeignKey(
                name: "FK_Diagrams_Projects_ProjectID",
                table: "Diagrams",
                column: "ProjectID",
                principalTable: "Projects",
                principalColumn: "ProjectID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Diagrams_Projects_ProjectID",
                table: "Diagrams");

            migrationBuilder.DropIndex(
                name: "IX_Diagrams_ProjectID",
                table: "Diagrams");

            migrationBuilder.DropColumn(
                name: "ProjectID",
                table: "Diagrams");
        }
    }
}
