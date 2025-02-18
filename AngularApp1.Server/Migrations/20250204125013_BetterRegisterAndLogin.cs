using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AngularApp1.Server.Migrations
{
    /// <inheritdoc />
    public partial class BetterRegisterAndLogin : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            if (migrationBuilder.Sql("SELECT OBJECT_ID('AssemblyLine')").ToString() == "NULL")
            {
                migrationBuilder.CreateTable(
                    name: "AssemblyLine",
                    columns: table => new
                    {
                        lineID = table.Column<int>(type: "int", nullable: false)
                            .Annotation("SqlServer:Identity", "1, 1"),
                        name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                        description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                        dateCreated = table.Column<DateTime>(type: "datetime2", nullable: false),
                        dateEdited = table.Column<DateTime>(type: "datetime2", nullable: false),
                        projectID = table.Column<int>(type: "int", nullable: false)
                    },
                    constraints: table =>
                    {
                        table.PrimaryKey("PK_AssemblyLine", x => x.lineID);
                        table.ForeignKey(
                            name: "FK_AssemblyLine_Projects_projectID",
                            column: x => x.projectID,
                            principalTable: "Projects",
                            principalColumn: "ProjectID",
                            onDelete: ReferentialAction.Cascade);
                    });

                migrationBuilder.CreateIndex(
                    name: "IX_AssemblyLine_projectID",
                    table: "AssemblyLine",
                    column: "projectID");
            }
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            if (migrationBuilder.Sql("SELECT OBJECT_ID('AssemblyLine')").ToString() != "NULL")
            {
                migrationBuilder.DropTable(
                    name: "AssemblyLine");
            }
        }
    }
}