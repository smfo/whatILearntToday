# IQueriable, IEnumerable and List

An **IEnumerable** object represents a sequence of objects. The sequence is held in memory and we can enumerate over it. However, it doesnt need the whole colection to be in memory and therefore does not know anything about it's structure or length.\
You can ask for the first element and get this, then the next one etc. as long as there are elements left in the sequence.

An **IQueriable** object might seem like an IEnumerable, however it represents the potential to get an IEnumerable, not the sequence itself.\
The IQueriable holds and Expressions and a Provider. Expression is a generic description expression that must be querid in order to fetch any elements. The Provider knows who will excecute the query, usually a db, and which language to use when communication with this (SQL).

A **List** and arrays are objects in memory. They know how many items are in their collection and konw of their whole overal structure. They therefore have access to a whole lot of other methods than IEnumerable and IQueriable.\
Use a list or an array if you want to get access to your results straight away or want to mutate the structure you are quering.

## From IQueriable to IEnumerable

When the code starts to enumerate over a IQueriable, it is converted to a IEnumerable.\
This happens explicitly when calling methods such as `GetEnumerator, MoveNext` and implicitly when calling `foreach, ToList, FirstOrDefault` etc. The current IQueriable Expression is sent to the Provider, which translates it to SQL and fetches the data from the DBMS. The data is returned as an IEnumerable.

In other words, this is when the query on a IQueriable is excecuted.

### Runtime errors

EF can only convert classes and methods to SQL that it knows about. It does not know in code functions, and several LINQ functions are not supported either. These functions cannot be ran on a IQueriable, as the whole Expression needs to be converted to SQL in order to eventually excecute the final query.

The compiler doesnt complain, becaus it cannot know which functions are supported by your version of EF. Therefore you get the errors at runtime.

For example, `String.Equals` is not supported.\
This code will not produce a compile time error, but the code will fail at runtime because the query isnt excecuted until after `student.LastName.Equals` is used.

```c#
var test = dbContext.Students
    .Where(student => student.LastName.Equals("ALEXANDER", StringComparison.InvariantCultureIgnoreCase))
    .FirstOrDefault();
```

This however, will run as it can be converted to SQL.

```C#
var test = dbContext.Students
    .Where(student => student.LastName == "ALEXANDER")
    .FirstOrDefault();

    // SQL
    SELECT TOP 1 * from myDatabase.Students where LastName = "ALEXANDER"
```

This is why you sometimes have to use methods such as `AsEnumerable` and `AsQueriable`.

## AsEnumerable and AsQueriable

These two Linq methods convert a DbSet/List/eachother to a Enumerable or Queriable. There are several reasons we want to use these. Among others that some Linq methods only accept one of them as input.

Other usecases

* For testing: mock a queriable data source using an in-memory data source making it easier to test methods that will be used on a non-enumerable based IQueriable

* Write helper methods that can be applied to either in-memory sequenses or external data sources. This way you avoid writing two seperat methods for a very generalized use case.\
Ex: write it for IQueriable and use `AsQueriable` to pass enumerables to it.

* Allows you to change the compile time type of a queryable to be an IEnumerable and the other way around.\
 Ex. You have an object that implements IQueryable and want to use Select on it, which takes an IEnumerable. In order to use it, you need to change the compile time type of the object to IQueryable. You could cast it, but by having an `AsQueryable` method you can take advantage of type inference. This is simply more convenient if the generic argument list is complex, and it is actually necessary if any of the generic arguments are anonymous types.

 ## IEnumerable and list

The difference between these examples is the `toList()` excecuted on the moreThanFiveletters variable in the second example.\
This makes the result of this query a list instead of a IEnumerable and creates an actual object for the variable to hold in memory. This list is independent of the names list and is not aware that benjamin is added to the list. In the first example however, the query over the names list is not executed until the loop, after benjamin is added. The moreThanFireLetters query is excecuted at the names list as it is in the excecution moment. Not like it was when the query was created.

 ```C#
static void Main()
{
  var names = new List<string> {"sam", "alexia", "simon", "sumanth", "tony", "sam", "amr", "mark", "drew"};
  var moreThanFiveLetters = names.Where(w => w.Length > 5);
  names[0] = "benjamin";

  foreach (var name in moreThanFiveLetters)
  {
      Console.WriteLine(name);
  }
}

// Output:
// alexia, sumanth, benjamin
 ```

 ```C#
 static void Main()
{
  var names = new List<string> {"sam", "alexia", "simon", "sumanth", "tony", "sam", "amr", "mark", "drew"};
  var moreThanFiveLetters = names.Where(w => w.Length > 5).ToList();
  names[0] = "benjamin";

  foreach (var name in moreThanFiveLetters)
  {
      Console.WriteLine(name);
  }
}

// Output:
// alexia, sumanth
 ```