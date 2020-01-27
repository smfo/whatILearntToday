

// Generate a new migration file
dotnet ef migrations add migrationName
// This will automatically generate a migration file with a up and down method and a snapshot of the database before the migration is executed

// When using add-migrations in the package manager console to generate migrations:
// The Up method upgrades the database from its current state (represented by your previous migration) to the 
// state expected by your current code migration. 
// The Down method does the reverse operation - it removes all the changes from the current migration and 
// reverts database to the state expected by the previous migration. 
// It's like installing / uninstalling the migration. Only one of these methods is executed when calling 
// update-database. To use the Down method you must explicitly specify the target migration for your upgrade. 
// If the target migration is the old one, the migration API will automatically use the Down method and 
// downgrade your database.

public partial class ApprovedTermsHistory : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                "ApprovedTermsHistory",
                table => new
                {
                    Id = table.Column<Guid>(),
                    ApprovedTermsId = table.Column<Guid>(nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(),
                    ModifiedAtUtc = table.Column<DateTime>(nullable: true),
                    NorwegianDescription = table.Column<string>(nullable: true),
                    EnglishDescription = table.Column<string>(nullable: true),
                    NiceClassId = table.Column<string>(nullable: true),
                    CreatedBy = table.Column<string>(nullable: true),
                    CreatedByEmail = table.Column<string>(nullable: true),
                    HDBExternalReference = table.Column<string>(nullable: true),
                    MadridReference = table.Column<string>(nullable: true),
                    NiceReference = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ApprovedTermsHistory", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                "IX_ApprovedTermsHistory_ApprovedTermsId",
                "ApprovedTermsHistory",
                "ApprovedTermsId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ApprovedTermsHistory");
        }
    }


// to use Down()
Update-Database -Target:201407242157114_46
// Where target us the name of the migration you want to downgrade to
// in this case the bad migration was migration 47