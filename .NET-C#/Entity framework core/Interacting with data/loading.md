
# Loading data

## Include
Return information from the chosen DbSet as well as a related table.\
Does not allow for filtering included data.

Returns samurais and their quotes.
```C#
_context.Samurais.Include( s => s.Quotes)
```

Multiple joins
```C#
_context.Samurais.Include( s => s.Quotes).Include( s => s.Clan)
```

### ThenInclude
Can be thought of as nested join.

Includes quotes and their translations from another table. Both examples give the same result.
```C#
_context.Samurais.Include( s => s.Quotes).ThenInclude( q => q.Translations )

_context.Samurais.Include( s => s.Quotes.Translations)
```

## Select
Only returns chosen fields from the table. 

```C#
var somePropertoesWithQuites = _context.Samurais.
    Select(s => new { s.Id, s.Name, s.Quotes }).ToList();
```
If more than one property is returned we need to return a new object.\
The objects returned will not match that of the tabel  as it is missing some values and will 
be of anonomous type. To move outside of the method where the information is retrived, it 
needs to be cast or saved as another type.

```C#
var idsAndNames = _context.Samurais.Select(s => new IdAndName(s.Id, s.Name)).ToList();

public struct IdAndName
{
    public IdAndName(int id, string name)
    {
        Id = id;
        Name = name;
    }
    public int Id;
    public string Name;
}
```

Its not required to bring back complete objects of the related types. We can return Quotes.Count
instead of all the Quotes.
```C#
var somePropertoesWithQuites = _context.Samurais.
    Select(s => new { s.Id, s.Name, s.Quotes.Count }).ToList();
```

Unlike with Include, Select lets you filter on the included data.\
Filter on the selected fields to only return some of them and give them new field names in the Object.
```C#
var somePropertiesWithQuotes = _context.Samurais
    .Select(s => new { s.Id, s.Name,
    HappyQuotes = s.Quotes.Where(q => q.Text.Contains("happy")) })
    .ToList();

var samuraisWithHappyQuotes = _context.Samurais
   .Select(s => new {
       Samurai = s,
       HappyQuotes = s.Quotes.Where(q => q.Text.Contains("happy"))
   })
   .ToList();
```

The last example will return an object with two fields Samurai, which contains the complete Samurai
object, and HappyQuotes, which contains the quotes related to the samurai that contains the word
"Happy". In contrast, Include returns an object containing all the Samurai fields and one field Quotes
that contains all the quites related to the Samurai. However, as mentioned, these quotes cannot be filtered.

```C#
select:
Return object = {
    Samurai = {
        samurai object
    },
    HappyQuotes = {
        happy quotes
    }
}

include:
Return object = {
samurai fields,
Quotes = {
    quotes
    }
}
```

## Load
Load related date to objects that are already in memory. This is done directly in the context.
```C#
var samurai = _context.Samurais.FirstOrDefault(s => s.Name.Contains("Julie"));

//samuari is already in memory
_context.Entry(samurai).Collection(s => s.Quotes).Load();
_context.Entry(samurai).Reference(s => s.Horse).Load();
```

Load can only be used for a single object at a time, if executed on a list its nesseccary to loope through
it and call load on each instance. In that case it might be better performance wise to send a new query
to the db.

It is possible to filter the related data.