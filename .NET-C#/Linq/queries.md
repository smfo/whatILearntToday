
# Queries

The Linq methods typically take a IEnumerable and returns a IEnumerable. In addition they often take a Func method as a parameter, telling the extension method how to order/filter/sort etc.

## Differed execution
Linq queries are not called until their results are actually used. Linq is as lazy as possible. The query does not work until it is forced to produce a result. See 3PartQuery.

This can be hurtfull as some operations, like count, forces the query to execute straight away. If you count results and then filter to output the same results afterwards, the query is executed twice.\
The answer here is to filter first and save the results in a different data structure. Moste of the methods that allow this starts with To, ToArray, ToList etc. These returns a concrete list of results instead of a yield variable. Running count on this will not run the filtering again, only count the number of elements in the list.
```C#
var query = movies.Filter(m => m.Year > 2000);

Console.WriteLine(query.Count()); //first query execution
var enumerator = query.GetEnumerator(); //second query execution
while (enumerator.MoveNext())
{
    Console.WriteLine(enumerator.Current.Title);
}
```

```C#
var query = movies.Where(m => m.Year > 2000).ToList(); //query execution

Console.WriteLine(query.Count()); //counting list elements
var enumerator = query.GetEnumerator();
while (enumerator.MoveNext())
{
    Console.WriteLine(enumerator.Current.Title);
}
```

## Query syntax vs method syntax
The query syntax looks a lot like SQL.

It always starts with `from`, continues with filters/aggregations and ends with `select` or `group`.
**NB**: not every Linq operator is available in query syntax (ex. count, take, skip).

```C#
var query = developers.Where(e => e.Name.Length == 5)
                        .OrderBy(e => e.Name);

var query2 = from developer in developers
            where developer.Name.Length == 5
            orderby developer.Name
            select developer;
```

Sometimes the syntaxes use different methods to express a query.
```C#
var query = developers.Where(e => e.Name.Length == 5)
                        .OrderByDescending(e => e.Name);

var query2 = from developer in developers
            where developer.Name.Length == 5
            orderby developer.Name descending
            select developer;
```

Behind the scenes the syntaxes are basically identical.

## Where
Filters the data, but does not know how to filter it. This has to be provided as a parameter.

Filter with lambda, a method call or a anoomys method (inline method using delegate).

## OrderBy
Knows how to order, but not how you want to order the elements.

## Streaming operator
Only has to read through the data until the point where it produces a result, "where" is an example of this. After this it will yield the result and this single item can be prosecuted. We then look at the second item, etc.

Non-streaming operators looks at all the elements before the query yields a result. Examples are all ordering operators.\
Because of this the order of operators matter when writing a query.