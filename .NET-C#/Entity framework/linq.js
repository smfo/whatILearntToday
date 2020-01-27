
// LINQ (Language integrated query) provides a single query interface for different types of data sources and eliminates
// the mismatch between programming languages and databases. It is built in C# or VBArray.NET



// Queries
// all query operations consist if three distinct actions 
// Obtain the data source 
// Create the query
// Execute the query 

class IntroToLINQ
{        
    static void Main()
    {
        // The Three Parts of a LINQ Query:
        // 1. Data source.
        int[] numbers = new int[7] { 0, 1, 2, 3, 4, 5, 6 };

        // 2. Query creation.
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

// the query is distinct from the query itself, meaning that no data is retrived just be creating a query variable
// step 3, doing something with the query variable has to be included as well
// queries are executed in foreach statements and require IEnumerable or IEunumerable<T>, if the data source is not on this format
// the LINQ provider must motify it to be so before executing the query

Northwnd db = new Northwnd(@"c:\northwnd.mdf");  
  
// Query for customers in London.  
IQueryable<Customer> custQuery =  
    from cust in db.Customers       // data source
    where cust.City == "London"     // filters
    select cust;                    // type of the returned elements


// a query is stored in a query variable and initialized with a query expression
// the query variable itself takes no action and returns no data!
// it just stores the information required to produce the results when the query is executed


// Query execution
// the execution of the query is not deferred until you iterate over the query variable in the foreach statement 
// this is called a deferred execution

//  Query execution. 
foreach (int num in numQuery)
{
    Console.Write("{0,1} ", num);
}

// this is also where the query results are retrived. Above the variable num holds each iteration variable, one at a time 
// in the returned sequence
// the query variable never holds the query results and can therefore be executed an infinit amount of times 
// this is usefull when checking for updates etc

// when a query aggregates over a range of source customElements, it must first iterate over the elements 
// this includes CountQueuingStrategy, max, average and first 
// since the query itself must use a foreach to return a results these execute without a foreach statement 
// these queries return a single IDBCursorWithValue, not an IEnumerable HTMLAllCollection

var evenNumQuery = 
    from num in numbers
    where (num % 2) == 0
    select num;

// query execution
int evenNumCount = evenNumQuery.Count();


// it is possible to force a immediate execution by using ToList or ToArray, this caches the result
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