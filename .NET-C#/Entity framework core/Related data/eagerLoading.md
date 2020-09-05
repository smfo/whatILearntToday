
# Eager loading
Includes the related objects in the query, data from other tables.

## Include
Return information from the chosen DbSet as well as a related table.\
Does not allow for selecting included data or filtering on which related data to include.

Returns samurais and their quotes.
```C#
_context.Samurais.Include( s => s.Quotes)
```

Multiple joins
```C#
_context.Samurais.Include( s => s.Quotes).Include( s => s.Clan)
```

NOTE: Include is a method of DbSet, not of the type returned from the table, in this case user.
Therefor it has to be used before executing methods. It can however be used after other methods that
belong to DbSet.

```C#
//This will not work as Take returns a type User
var user = _context.User.Take(16).Include(u => u.PlayedGames);

// these will work
var user = _context.User.Include(u => u.PlayedGames).Take(16);
var user = _context.User.Where(u => u.Name = "Synne").Include(u => u.PlayedGames).ToList();
```


### ThenInclude
Can be thought of as nested join.

Includes quotes and their translations from another table. Both examples give the same result.
```C#
_context.Samurais.Include( s => s.Quotes).ThenInclude( q => q.Translations )

_context.Samurais.Include( s => s.Quotes.Translations)
```