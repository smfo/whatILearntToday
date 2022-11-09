# SQL script

A series of sql commands that can be run and uset to ex. create tables, insert data, delete tables etc.

## Variables

Before being able to use a variable in the sql script we need to declare it

```sql
-- Where the initial value is optional
DECLARE @variableName data_type = value

DECLARE @ProveList AS nvarchar(max);
```

If no initial value is declared, the variable will be initialized as `NULL`.

We can use SET or SELECT to assign a value to the variable.

```sql
DECLARE @TestVariable AS VARCHAR(100)
SET @TestVariable = 'One Planet One Life'

--  With multiple variable as once
DECLARE @VarAccountNumber AS NVARCHAR(15)
,@VariableName AS NVARCHAR(50)
SELECT @VarAccountNumber=AccountNumber , @VariableName=Name
FROM [Purchasing].[Vendor]
WHERE BusinessEntityID = 1492
```

Select x values when multiple are returned

```sql
declare @passordId as int
select top 1 @passordId = Id
from Prove.Passord
where Passordsett_Id = @passordsettId
```

### Variable as list

We can use the table variable to store multiple values in the same variable. It stores a result set for processing at a later time and is primarily for storing a set of rows.

```sql
DECLARE @ListOWeekDays TABLE(DyNumber INT,DayAbb VARCHAR(40) , WeekName VARCHAR(40))
 
INSERT INTO @ListOWeekDays
VALUES 
(1,'Mon','Monday')  ,
(2,'Tue','Tuesday') ,
(3,'Wed','Wednesday') ,
(4,'Thu','Thursday'),
(5,'Fri','Friday'),
(6,'Sat','Saturday'),
(7,'Sun','Sunday')	

SELECT * FROM @ListOWeekDays
```

For a simple list we use a table with one column.
```sql
declare @proveIds table (deliveryId int)
insert @proveIds(deliveryId) values(1578),(1579)
```

## For loop

See [cursor](./cursor.md)