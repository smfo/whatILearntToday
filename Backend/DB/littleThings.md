# Little database tips

## Scalar, aggregated function

**Scalar** function returns one value per invocation, in most cases this means per row. This differs from **aggregated** functions which returns one value per groupd of rows.

## SelectMany

SelectMany varies from Select by one thing. Select returns a list of a list as a list of a list, while SelectMany flatens the structure and returns one List.

```C#
public class PhoneNumber
{
    public string Number { get; set; }
}

public class Person
{
    public IEnumerable<PhoneNumber> PhoneNumbers { get; set; }
    public string Name { get; set; }
}

IEnumerable<Person> people = new List<Person>();

// Select gets a list of lists of phone numbers
IEnumerable<IEnumerable<PhoneNumber>> phoneLists = people.Select(p => p.PhoneNumbers);

// SelectMany flattens it to just a list of phone numbers.
IEnumerable<PhoneNumber> phoneNumbers = people.SelectMany(p => p.PhoneNumbers);

// And to include data from the parent in the result: 
// pass an expression to the second parameter (resultSelector) in the overload:
var directory = people
   .SelectMany(p => p.PhoneNumbers,
               (parent, child) => new { parent.Name, child.Number });
```

## GO

A batch separator ysed by client tools like SSMS.

Sidenote: SQL servers provide commands that are not transactional SQL statments, but are recognized by client tools. These are used to facilitate the redability and execution of batches and scripts. GO is a command like this.

This statement is used to group SQL commands into batches, that are then sent to the server together. This could for example affect memory usage.\
The commands within one batch must be logically consistent. For example is it not possible tp use variables outside of the batch they are declared in.

```
GO [count]
```
Where count decides how many times the above batch will be ran. Default is 1.

```sql
USE AdventureWorks2012;  
GO  
DECLARE @NmbrPeople INT  
SELECT @NmbrPeople = COUNT(*)  
FROM Person.Person;  
PRINT 'The number of people as of ' +  
      CAST(GETDATE() AS CHAR(20)) + ' is ' +  
      CAST(@NmbrPeople AS CHAR(10));  
GO

SELECT DB_NAME();  
SELECT USER_NAME();  
GO 2
```

## Offset

This command excludes the first set of rows in a result set. They **have** to be used with an ORDER BY clause.

FETCH NEXT returns a window of rows and is used for pagination through the data in a table.

```sql
SELECT column-names
FROM table-name
ORDER BY column-names
OFFSET n ROWS
FETCH NEXT m ROWS ONLY
```

```sql
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
```