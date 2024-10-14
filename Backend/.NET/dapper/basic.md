# Dapper

Dapper is a cross-platform .net library, meaning it can be used on any platform that supports .net.\
It is a micro ORM (object relational mapping) library. Not as extensive as EF Core, as you need to map your own models and write your own sql. It requires less setup than a full ORM.

Dapper extends `IDBConnection` and adds four methods: `Query, Execute, ExecuteScalar, ExecuteReader`

## Dapper vs EF Core

**Dapper**
- In Dapper you have to write your own SQL
- Run your own migrations
- SQL first

**EF Core**
- Steeper learning curve
- Takes care of much more than a micro-ORM (migrations, lazy loading, sql generation, identity management)
- Code first 
- Supporte LINQ