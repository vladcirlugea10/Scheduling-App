using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Scheduling_Backend.Migrations
{
    /// <inheritdoc />
    public partial class AddBusinessModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "BusinessId",
                table: "Appointments",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.CreateTable(
                name: "Businesses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    Phone = table.Column<string>(type: "text", nullable: false),
                    Address = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Businesses", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Appointments_BusinessId",
                table: "Appointments",
                column: "BusinessId");

            migrationBuilder.AddForeignKey(
                name: "FK_Appointments_Businesses_BusinessId",
                table: "Appointments",
                column: "BusinessId",
                principalTable: "Businesses",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Appointments_Businesses_BusinessId",
                table: "Appointments");

            migrationBuilder.DropTable(
                name: "Businesses");

            migrationBuilder.DropIndex(
                name: "IX_Appointments_BusinessId",
                table: "Appointments");

            migrationBuilder.AlterColumn<int>(
                name: "BusinessId",
                table: "Appointments",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);
        }
    }
}
