# Load

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

It is possible to filter the related data. This is not possbible with eager loading, when using Include.