using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AngularApp1.Server.Migrations
{
    /// <inheritdoc />
    public partial class Diagrams : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            if (migrationBuilder.Sql("SELECT OBJECT_ID('Diagrams')").ToString() == "NULL")
            {
                migrationBuilder.CreateTable(
                    name: "Diagrams",
                    columns: table => new
                    {
                        Id = table.Column<int>(type: "int", nullable: false)
                            .Annotation("SqlServer:Identity", "1, 1"),
                        Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                        JsonData = table.Column<string>(type: "nvarchar(max)", nullable: false)
                    },
                    constraints: table =>
                    {
                        table.PrimaryKey("PK_Diagrams", x => x.Id);
                    });
            }

            if (migrationBuilder.Sql("SELECT OBJECT_ID('Images')").ToString() == "NULL")
            {
                migrationBuilder.CreateTable(
                    name: "Images",
                    columns: table => new
                    {
                        imageID = table.Column<int>(type: "int", nullable: false)
                            .Annotation("SqlServer:Identity", "1, 1"),
                        name = table.Column<string>(type: "nvarchar(255)", nullable: true),
                        imagePath = table.Column<string>(type: "nvarchar(255)", nullable: true)
                    },
                    constraints: table =>
                    {
                        table.PrimaryKey("PK_Images", x => x.imageID);
                    });
            }

            if (migrationBuilder.Sql("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'AspNetUsers' AND COLUMN_NAME = 'ImageId'").ToString() == "NULL")
            {
                migrationBuilder.AddColumn<int>(
                    name: "ImageId",
                    table: "AspNetUsers",
                    type: "int",
                    nullable: true);
            }
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Diagrams");

            migrationBuilder.DropTable(
                name: "Images");

            if (migrationBuilder.Sql("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'AspNetUsers' AND COLUMN_NAME = 'ImageId'").ToString() != "NULL")
            {
                migrationBuilder.DropColumn(
                    name: "ImageId",
                    table: "AspNetUsers");
            }
        }
    }
}