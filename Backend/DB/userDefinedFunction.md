# SQL user-defined function

## Functions and procedures

Functions
- Must return a single value (scalar or a table)
- Cannot return a parameter
- Cannot alter anything (insert, update or delete)

Procedures
- Can change database objects
- Do not have to return a value
- Can have input and output parameters, not just single values
- Caon contain try-catch


```sql
-- Schema name
CREATE SCHEMA TestData;
GO

-- The type used for the parameter input in the function, @rows
CREATE TYPE TestData.FNrAndDeliveryIds AS TABLE(FNr NVARCHAR(450),
    EpsDeliveryId NVARCHAR(450));
GO

-- TestDate.RenderGdsDeleteScriot follows schema_name.function_name
CREATE OR ALTER FUNCTION TestData.RenderGdsDeleteScript(@rows FNrAndDeliveryIds READONLY)
RETURNS NVARCHAR(MAX)
AS
BEGIN
    DECLARE @script NVARCHAR(MAX);
    DECLARE @nl NVARCHAR(2) = char(13)+char(10);

    SET @script = '-- Run this query in GDS' + @nl;
    SET @script += CONCAT('------------------', @nl);
    SET @script += CONCAT('BEGIN TRANSACTION;', @nl);

    SET @script += CONCAT('DECLARE @deliveriesToDelete TestData.DeliveryAndUsersTable;', @nl);

    DECLARE @p INT = 0;
    DECLARE @pageSize INT = 1000;
    WHILE @p < (SELECT COUNT(1)
    FROM @rows)
    BEGIN
        DECLARE @values VARCHAR(MAX);
        SELECT @values = STRING_AGG(CONVERT(NVARCHAR(MAX), CONCAT('(''', r.FNr,''', ','''',r.EpsDeliveryId, ''')')),', ')
        FROM (SELECT *
            FROM @rows
            ORDER BY FNr OFFSET @p ROWS FETCH NEXT @pageSize ROWS ONLY) r;

        SET @script += CONCAT('INSERT INTO @deliveriesToDelete VALUES ', @values,';', @nl);
        SET @p += @pageSize;
    END

    SET @script += CONCAT('exec TestData.DeleteExecutionData @deliveriesToDelete;', @nl);
    SET @script += CONCAT('COMMIT TRANSACTION', @nl);
    SET @script += CONCAT('------------------', @nl);

    RETURN @script;
END;
GO

-- In-Memory OLTP: Syntax for natively compiled, scalar user-defined function
CREATE [ OR ALTER ] FUNCTION [ schema_name. ] function_name
 ( [ { @parameter_name [ AS ][ type_schema_name. ] parameter_data_type
    [ NULL | NOT NULL ] [ = default ] [ READONLY ] }
    [ ,...n ]
  ]
)
RETURNS return_data_type
     WITH <function_option> [ ,...n ]
    [ AS ]
    BEGIN ATOMIC WITH (set_option [ ,... n ])
        function_body
        RETURN scalar_expression
    END

<function_option>::=
{
  |  NATIVE_COMPILATION
  |  SCHEMABINDING
  | [ EXECUTE_AS_Clause ]
  | [ RETURNS NULL ON NULL INPUT | CALLED ON NULL INPUT ]
}

```

**Or alter**: self explanatory, optional\
**Schema name vs functon name**: the name of the schema to which the user-defined function belongs vs the name of the user-defined function\
**[ type_schema_name. ] parameter_data_type**: the type of the parameter and optinally the name of the schema it belongs to\
**[ = default ]**: the optional default value of the parameter\
**return_data_type**: the returntype for the function

Example using default value
```sql
CREATE OR ALTER PROCEDURE TestData.DeleteProveDataPartial
    @proveIds Verifisering.ProveIdSet READONLY,
    @percentage INT = 0
AS
```

[Read more](https://learn.microsoft.com/en-us/sql/t-sql/statements/create-function-transact-sql?view=sql-server-ver16)