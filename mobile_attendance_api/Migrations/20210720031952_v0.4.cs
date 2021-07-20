using Microsoft.EntityFrameworkCore.Migrations;

namespace mobile_attendance_api.Migrations
{
    public partial class v04 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<bool>(
                name: "Status",
                table: "Devices",
                type: "boolean",
                nullable: false,
                defaultValue: false,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Status",
                table: "Devices",
                type: "text",
                nullable: true,
                oldClrType: typeof(bool),
                oldType: "boolean");
        }
    }
}
