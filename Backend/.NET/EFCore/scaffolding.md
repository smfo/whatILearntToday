# Scaffolding - db first

If you already have a database but want to use EF Core, you can scaffold the database with EF Core to create the dbmodels and dbcontext.

```C#
// Using connectionstring
dotnet ef dbcontext scaffold "Data Source=(localdb)\MSSQLLocalDB;Initial Catalog=Chinook" Microsoft.EntityFrameworkCore.SqlServer
```

This will put the connectionstring directly in the DbContext. Remove this and replace it with the following in Setup.cs - configureServices

```C#
services.AddDbContext<ArrangementDbContext>(options =>
{
    options.UseSqlServer(Configuration["ConnectionStrings:EventDb"]);
});
```

## Migrations - from functional database

To setup the EF Core migrations run `dotnet ef migrations add InitialCreate`. This will create the first migration and the snapshot.

NBNB!\
The command is actually meant to be `Add-Migration InitialCreate -IgnoreChanges`, so that the migration won't attempt to create the scaffolded tables that already exist in the database. This flag doesn't exist in the visual studio commands. Therefore, run the command in the paragraph above and manually empty the Up and Down method of the first migration.

Then run `dotnet ef database update`. This will create the _EFMigrationsHistory table and add the first migration.

### Testing