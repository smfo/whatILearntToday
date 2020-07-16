
# Migrations
 The migrations tools needs some exacutables to help them run, it is not something 
 that can be done by the data library project itself. We need access to both the migration
 commands and the migration logic.

 Add the Microsoft.EnityFrameworkCore.Tools to an executable project, the console app.\
 This will also install the Microsoft.EntityFrameworkCore.Design package, that is the 
 migrations APIs.

 **Powershell commands**
 Commands that can be run the the Package Manager Console.\
 Make sure the default project is set to where EFCore, the commands and the context is, the data project.

 * get-help entityframework
 * Add-Migration               Adds a new migration.
 * Drop-Database               Drops the database.
 * Get-DbContext               Gets information about a DbContext type.
 * Remove-Migration            Removes the last migration.
 * Scaffold-DbContext          Scaffolds a DbContext and entity types for a database.
 * Script-DbContext            Generates a SQL script from the current DbContext.
 * Script-Migration            Generates a SQL script from migrations.
 * Update-Database             Updates the database to a specified migration.

 ## Add-Migration
 `add-migration wantedMigrationName`\
 The migration file is created with the given name.

 This adds a migrations folder to the data project that contains the migrations and a model snapshot file.
 This is where EF keeps track of the current state of the model.

 See upDown for info about the migration file.

## Update-Database
 After a migration is created the database needs to be updated to invoke the changes.\
 Adding `-verbose` logs everything that is done by this command.\
 
 The first time this command is used, if there is no already existing database, a database will be created. In
 addition to containing the given models, there will also be a EFMigrationsHistory table. This shows all the migrations
 that has been run on the database.

 For VS local SQL the SQL server might need to get refreshed. This can be selected by right clicking in the 'SQL server Object Explorer'.

## "Startup project targets framework '.NetStandard'"

```txt
Startup project 'project' targets framework '.NETStandard'. There is no runtime associated with this framework, and projects targeting it cannot be executed directly. To use the Entity Framework Core Package Manager Console Tools with this project, add an executable project targeting .NET Framework or .NET Core that references this project, and set it as the startup project; or, update this project to cross-target .NET Framework or .NET Core. For more information on using the EF Core Tools with .NET Standard projects, see https://go.microsoft.com/fwlink/?linkid=2034705
```

The Default Project in the Package Manager Console is set to the context project which is not executable, but more like an interface. 
An interface cannot be initialised, so on order to actually do somehting the Startup project of the namespace needs to be set to an executable project. This is a project that uses .NET Core instead of .NET Standard, like a console project. In VS this can be done by right clicking the project and selecting "Set as startup project".