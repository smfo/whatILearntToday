
# Filtering

```C#
var name = "Yuki"
var samurais = _context.Samurais.Where(s => s.Name == name).ToList();
```
ToList executes the query.

## EF Functions
It is also possible to use EF.Functions.Like instead of Where. EF.Functions.Contains is also an option,
however this translates into a Like anyways.\
See EFFunctions for more info.

## Filter on related data
Related data can be used for filtering even if it is not included in the returned object.

```C#
var samurais = _context.Samurais
    .Where(s => s.Quotes.Any(q => q.Text.Contains("happy")))
    .ToList();
```