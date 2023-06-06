
# Aggregations

LINQ to entities execution methods.

* ToList()
* First()
* FirstOrDefault()
* Single()
* SingleOrDefault()
* Last()
* LastOrDefault()
* Count()
* LongCOunt()
* Min()
* Max()
* Average()
* Sum()

Every method also has an async version (ex. ToListAsync()).

Every method exept for ToList performs an aggregation.

**DbSet.Find(key)**
This is not a LINQ method, but a DbSet one. The method executes immediatly, and if the key
is already in memory it won't ssend a new query to the database.

```C#
//Finds the samurai with key, id, 2
_context.Samurais.Find(2)
```

**LastOrDefault**
This will only work after using sort by OrderBy. Otherwise there is no way of finding the last element.
```C#
_context.Samurais.OrderBy(s => s.Id).LastOrDefault( s => s.Name == name);
```