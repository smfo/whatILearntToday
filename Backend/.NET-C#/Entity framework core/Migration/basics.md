

# Migrations basics

What is a migration:\
A migration represents a version of the database, sort of like a git commit. Changes to the db model is
documented by creating a migration file, which then is applied to the DB to make the changes there or 
used to run a script.

EF Core migrations are source-control friendly.

## Migrations
This feature provides a way to update the database schema to keep it in sync with the application's data while preserving existing
data in the database.\
The migration scripts are kept in order to keep track of the database versions.
Add a migration to bring the database schemas up to data with the EF Core Model. The migration name can be used as a commit message,
describing the changes being done.

#### .NET Core CLI
`dotnet ef migrations add migrationName`
#### Visual studio
`Add-Migration migrationName`

## Add column to table customer
```C#
migrationBuilder.AddColumn<string>(
    name: "Name",
    table: "Customer",
    nullable: true);

// fill the name column to prevent loss of data when firsName and LastName is deleted
migrationBuilder.Sql(
@"
    UPDATE Customer
    SET Name = FirstName + ' ' + LastName;
");

// delete column named firstname
migrationBuilder.DropColumn(
    name: "FirstName",
    table: "Customer");

migrationBuilder.DropColumn(
    name: "LastName",
    table: "Customer");

// apply migration to db
dotnet ef database update
Update-Database
```


## Merging
The snapshot file tells you if the teammates migration merges cleanly with yours or if there is a conflict.

Part of snapshot
```C#
modelBuilder.Entity("PS.Classification.Data.DBOModels.ApprovedTerm", b =>
                {
                    // Value generated by db
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedAtUtc");

                    b.Property<string>("HDBEnglishDescription");

                    b.Property<Guid>("HDBImportTermId");

                    b.Property<DateTime?>("ModifiedAtUtc");

                    b.Property<string>("NiceClassId");

                    b.Property<string>("NorwegianDescription");

                    b.HasKey("Id");

                    // Unique value
                    b.HasIndex("HDBImportTermId")
                        .IsUnique();

                    b.ToTable("ApprovedTerms");
                });


                migrationBuilder.CreateTable(
                    name: "TermSource",
                    columns: table => new
                    {
                        Id = table.Column<Guid>(nullable: false),
                        Source = table.Column<string>(nullable: true),
                        Reference = table.Column<string>(nullable: true),
                        ApprovedTermId = table.Column<Guid>(nullable: false),
                        PSInternalId = table.Column<long>(nullable: false)
                    },
                    constraints: table =>
                    {
                        table.PrimaryKey("PK_TermSource", x => x.Id);
                        table.ForeignKey(
                            name: "FK_TermSource_ApprovedTerms_ApprovedTermId",
                            column: x => x.ApprovedTermId,
                            principalTable: "ApprovedTerms",
                            principalColumn: "Id",
                            onDelete: ReferentialAction.Cascade);
                    });
    
                migrationBuilder.CreateIndex(
                    name: "IX_TermSource_ApprovedTermId",
                    table: "TermSource",
                    column: "ApprovedTermId");
```