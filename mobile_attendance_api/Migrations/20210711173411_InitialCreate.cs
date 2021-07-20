using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace mobile_attendance_api.Migrations
{
  public partial class InitialCreate : Migration
  {
    protected override void Up(MigrationBuilder migrationBuilder)
    {
      migrationBuilder.CreateTable(
          name: "Lectures",
          columns: table => new
          {
            Id = table.Column<int>(type: "integer", nullable: false)
                  .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
            Name = table.Column<string>(type: "text", nullable: true),
            Email = table.Column<string>(type: "text", nullable: true),
            EmailToken = table.Column<string>(type: "text", nullable: true),
            DateCreated = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
            DateUpdated = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
            IsAdmin = table.Column<bool>(type: "boolean", nullable: true)
          },
          constraints: table =>
          {
            table.PrimaryKey("PK_Lectures", x => x.Id);
          });
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
      migrationBuilder.DropTable(
          name: "Lectures");
    }
  }
}
