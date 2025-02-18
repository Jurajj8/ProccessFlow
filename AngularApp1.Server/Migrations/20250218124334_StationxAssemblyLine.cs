using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AngularApp1.Server.Migrations
{
    /// <inheritdoc />
    public partial class StationxAssemblyLine : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AssemblyLineID",
                table: "Stations",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Stations_AssemblyLineID",
                table: "Stations",
                column: "AssemblyLineID");

            migrationBuilder.AddForeignKey(
                name: "FK_Stations_AssemblyLine_AssemblyLineID",
                table: "Stations",
                column: "AssemblyLineID",
                principalTable: "AssemblyLine",
                principalColumn: "lineID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Stations_AssemblyLine_AssemblyLineID",
                table: "Stations");

            migrationBuilder.DropIndex(
                name: "IX_Stations_AssemblyLineID",
                table: "Stations");

            migrationBuilder.DropColumn(
                name: "AssemblyLineID",
                table: "Stations");
        }
    }
}
