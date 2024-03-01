# User defined type

There is two types the user can define and save in SQL, data types and table types.

Data types are simple types, whereas table types defineds a whole table with defined types for all columns.

Example of creating table type in sql script
```sql
CREATE TYPE UserIdTable AS TABLE (userId NVARCHAR(450));

DROP TYPE FodselsnummerTable
```