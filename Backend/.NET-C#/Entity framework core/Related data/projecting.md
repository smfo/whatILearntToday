# Projecting data
Chose which data fields to return.

Anonymous types will not be tracked! As they do not match a DbSet type. However, if parts of
what is returned is a type, see HappyQuotes where complete Quotes are returned, this data will
be tracked even if Samurai is not.

## Select
Only returns chosen fields from the table(s). 

```C#
var somePropertoesWithQuites = _context.Samurais.
    Select(s => new { s.Id, s.Name, s.Quotes }).ToList();
```
If more than one property is returned we need to return a new object.\
The objects returned will not match that of the tabel as it is missing some values and will 
be of **anonomous** type. To move outside of the method where the information is retrived, it 
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

## Related data

Its not required to bring back complete objects of the related types. We can return Quotes.Count
instead of all the Quotes.

```C#
var somePropertoesWithQuites = _context.Samurais.
    Select(s => new { s.Id, s.Name, s.Quotes.Count }).ToList();
```

### Filtering
Unlike with Include, Select lets you filter on the included data.\
NB: this changes with EF Core 5!\

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

The related data does not have to be retrived earlier in the query to be available in Select.
Here PlayedGames is a join table between Users and Games, however we can include fields from
Games in the Select object.
```C#
_context.Users.Where(x => x.Name == userName)
                .Select(x =>
                    new UserWithGames()
                    {
                        Name = x.Name,
                        PlayedGames = x.PlayedGames.Select(y => y.Game.Name).ToList(),
                        FavoritGames = x.FavoritGames.Select(x => x.Game.Name).ToList(),
                        WantToPlayGames = x.WantToPlayGames.Select(x => x.Game.Name).ToList()
                }).FirstOrDefault();
```

The last example will return an object with two fields Samurai, which contains the complete Samurai
object, and HappyQuotes, which contains the quotes related to the samurai that contains the word
"Happy".\
In contrast, Include returns an object containing all the Samurai fields and one field Quotes
that contains all the quites related to the Samurai. However, as mentioned, these quotes cannot be filtered.

In this example, both Samurai and Quite will be tracked even though they are not on the default return form. 
This is because they still match a DbSet type, separetly.

```C#
// Select:
Return object = {
    Samurai = {
        samurai object
    },
    HappyQuotes = {
        happy quotes
    }
}

// Include:
Return object = {
samurai fields,
Quotes = {
    quotes
    }
}
```