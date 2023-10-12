using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApplication5.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "GuitarChords",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Variant = table.Column<long>(type: "bigint", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Shape = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GuitarChords", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Songs",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Artist = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Album = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Tuning = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    VideoId = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Songs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SongProfiles",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SongId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SongProfiles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SongProfiles_Songs_SongId",
                        column: x => x.SongId,
                        principalTable: "Songs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ChordChange",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ChordId = table.Column<long>(type: "bigint", nullable: false),
                    AtMilliseconds = table.Column<long>(type: "bigint", nullable: false),
                    Duration = table.Column<long>(type: "bigint", nullable: false),
                    SongProfileId = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChordChange", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ChordChange_GuitarChords_ChordId",
                        column: x => x.ChordId,
                        principalTable: "GuitarChords",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ChordChange_SongProfiles_SongProfileId",
                        column: x => x.SongProfileId,
                        principalTable: "SongProfiles",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_ChordChange_ChordId",
                table: "ChordChange",
                column: "ChordId");

            migrationBuilder.CreateIndex(
                name: "IX_ChordChange_SongProfileId",
                table: "ChordChange",
                column: "SongProfileId");

            migrationBuilder.CreateIndex(
                name: "IX_SongProfiles_SongId",
                table: "SongProfiles",
                column: "SongId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ChordChange");

            migrationBuilder.DropTable(
                name: "GuitarChords");

            migrationBuilder.DropTable(
                name: "SongProfiles");

            migrationBuilder.DropTable(
                name: "Songs");
        }
    }
}
