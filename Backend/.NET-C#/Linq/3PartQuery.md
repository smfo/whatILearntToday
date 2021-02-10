
## Queries
All query operations consist if three distinct actions 
* Obtain the data source 
* Create the query
* Execute the query 

```C#
class IntroToLINQ
{        
    static void Main()
    {
        // The Three Parts of a LINQ Query:
        // 1. Data source.
        int[] numbers = new int[7] { 0, 1, 2, 3, 4, 5, 6 };

        // 2. Query creation, query variable
        // numQuery is an IEnumerable<int>
        var numQuery =
            from num in numbers
            where (num % 2) == 0
            select num;

        // 3. Query execution.
        foreach (int num in numQuery)
        {
            Console.Write("{0,1} ", num);
        }
    }
}
```

The query variable is not connected to the query execution, meaning that no data is retrived just be creating a query variable, 
doing something with the query variable has to be included as well.\
Queries are executed in foreach statements and require IEnumerable or IEunumerable<T>, if the data source is not on this format
the LINQ provider must modify it to be so before executing the query.

```C#
Northwnd db = new Northwnd(@"c:\northwnd.mdf");  
  
// Query for customers in London.  
IQueryable<Customer> custQuery =  
    from cust in db.Customers       // data source
    where cust.City == "London"     // filters
    select cust;                    // type of the returned elements
```

A query is stored in a query variable and initialized with a query expression,
the query variable itself takes no action and returns no data!
It just stores the information required to produce the results when the query is executed

## Query execution
The execution of the query is not deferred until you iterate over the query variable in the foreach statement, 
this is called a deferred execution.
```C#
foreach (int num in numQuery)
{
    Console.Write("{0,1} ", num);
}
```

This is also where the query results are retrived. Above the variable num holds each iteration variable, one at a time 
in the returned sequence.

The query variable never holds the query results and can therefore be executed an infinit amount of times. 
This is usefull when checking for updates etc.

When a query aggregates over a range of source customElements, it must first iterate over the elements, 
this includes CountQueuingStrategy, max, average and first .
Since the query itself must use a foreach to return a result these execute without a foreach statement. 
These queries return a single IDBCursorWithValue, not an IEnumerable HTMLAllCollection.

```C#
var evenNumQuery = 
    from num in numbers
    where (num % 2) == 0
    select num;

// query execution
int evenNumCount = evenNumQuery.Count();
```

It is possible to force a immediate execution by using ToList or ToArray, this caches the result
```C#
List<int> numQuery2 =
    (from num in numbers
     where (num % 2) == 0
     select num).ToList();

// or like this:
// numQuery3 is still an int[]

var numQuery3 =
    (from num in numbers
     where (num % 2) == 0
     select num).ToArray();
```