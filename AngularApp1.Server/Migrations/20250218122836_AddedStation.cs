using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AngularApp1.Server.Migrations
{
    /// <inheritdoc />
    public partial class AddedStation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Diagrams_ProjectID",
                table: "Diagrams");

            migrationBuilder.CreateIndex(
                name: "IX_Diagrams_ProjectID",
                table: "Diagrams",
                column: "ProjectID",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Diagrams_ProjectID",
                table: "Diagrams");

            migrationBuilder.CreateIndex(
                name: "IX_Diagrams_ProjectID",
                table: "Diagrams",
                column: "ProjectID");
        }
    }
}
