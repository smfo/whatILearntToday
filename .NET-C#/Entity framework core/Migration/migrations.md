
# Migrations
 The migrations tools needs some exacutables to help them run, it is not something 
 that can be done by the data library project itself. We need access to both the migration
 commands and the migration logic.

 Add the Microsoft.EnityFrameworkCore.Tools to an executable project.\
 This will also install the Microsoft.EntityFrameworkCore.Design package, that is the 
 migrations APIs.

 **Powershell commands**
 Commants that can be run the the Package Manager Console.\
 Make sure the default project is set to where EFCore, the commands and the context is.

 * get-help entityframework
 * Add-Migration               Adds a new migration.
 * Drop-Database               Drops the database.
 * Get-DbContext               Gets information about a DbContext type.
 * Remove-Migration            Removes the last migration.
 * Scaffold-DbContext          Scaffolds a DbContext and entity types for a database.
 * Script-DbContext            Generates a SQL script from the current DbContext.
 * Script-Migration            Generates a SQL script from migrations.
 * Update-Database             Updates the database to a specified migration.

 **Add-Migration**
 `add-migration wantedMigrationName`\
 The migration file is created with the given name.

 This adds a migrations folder to the data project that contains the migrations and a model snapshot file.
 This is there EF keeps track of the current state of the model.

 See upDown for info about the migration file.

 **Update-Database**
 After a migration is created the database needs to be updated to invoke the changes.\
 Adding `-verbose` logs everything that is done by this command.\
 
 The first time this command is used, if there is no already existing database, a database will be created. In
 addidtion to containing the given models, there will also be a EFMigrationsHistory table. This shows all the migrations
 that has been run on the database.