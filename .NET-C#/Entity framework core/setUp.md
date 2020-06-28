
# Setting up a EF core project

EF Core needs a connection to the database that will be used, so install the EF Core database 
server NuGet package instead of the EntityFremeworkCore package in the data project.

For SQL this means the Microsoft.EntityFrameworkCore.SqlServer package.


Its nessecary to specifiy the data provider to the project. This is done in the context class
in the data project. THe context class needs to extend DbContext.

For SQL it looks like this:
```C#
protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(
                "Data Source = (localdb)\\MSSQLLocalDB; Initial Catalog = SamuraiAppData");
        }
```

If there is no database matching the server information, EF will automatically create one on the first
runthrough.

Information about the SQL databases can be seen in the SQL Server Object Explorer.