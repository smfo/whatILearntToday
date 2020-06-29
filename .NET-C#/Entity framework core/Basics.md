
# Entity framework core
ORM (object relational mapper)
Enables .NET developers to work with databases using .NET objects and eliminates the need for most of the data-access code.\
Data access is performed using a model made up of entity classes and a context Object.
The object represents a session with the database, allowing the developer to query and save data.
A model is generated from an existing database, can be hand coded to match the current database of created by using EF Migrations.

## Workflow
* EF core transform the query to proper SQL
* Sends SQL to the database where it is executed
* Translate the SQL results to the objects used in the code