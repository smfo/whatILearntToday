
# Basic data operations

All of these have a range option, and can chose to use the DbContext method
instead of the DbSet method. EF Core will manage to match the object with the correct table.

**Add**
_context.Samurais.Add(samurai)
_context.Samurais.AddRange(samuraiList)

_context.Add(samurai)
_context.AddRange(samurai, battle)

**Update**
_context.Samurais.Update(samurai)
_context.Samurais.UpdateRange(samuraiList)

_context.Update(samurai)
_context.UpdateRange(samurai, battle)

**Delete**
_context.Samurais.Remove(samurai)
_context.Samurais.RemoveRange(samuraiList)

_context.Remove(samurai)
_context.RemoveRange(samurai, battle)

## Adding data

```C#
context.DbSetToAddTo.Add(Value)

context.DbSetToAddTo.AddRange(value, value);
```
AddRange lets you add multiple object to the database table. AddRange accepts multiple values,
or a list with values.

From 4 inserts and up, EF Core uses batch inserts.

In newer versions of DbContext, the program will figure out which DbSet to use automatically,
allowing for inserting data to multiple DbSets in one operation.
```C#
var samurai = new Samurai { Name = "Kikuchio" };
var clan = new Clan { ClanName = "Imperial Clan" };
context.AddRange(samurai, clan);
context.SaveChanges();


_context.Battles.Add(new Battle
{
    Name = "Battle of Okehazama",
    StartDate = new DateTime(1560, 05, 01),
    EndDate = new DateTime(1560, 06, 15)
});
_context.SaveChanges();
```

### Related data
EF Core will automatically add related information at the same time.

In this case a new quote will be added with a foreign key to the samurai.
```C#
private static void InsertNewSamuraiWithAQuote()
        {
            var samurai = new Samurai
            {
                Name = "Kambei Shimada",
                Quotes = new List<Quote>
        {
          new Quote { Text = "I've come to save you" }
        }
            };
            _context.Samurais.Add(samurai);
            _context.SaveChanges();
        }

private static void InsertNewSamuraiWithManyQuotes()
        {
            var samurai = new Samurai
            {
                Name = "Kyūzō",
                Quotes = new List<Quote> {
            new Quote {Text = "Watch out for my sharp sword!"},
            new Quote {Text="I told you to watch out for the sharp sword! Oh well!" }
        }
            };
            _context.Samurais.Add(samurai);
            _context.SaveChanges();
        }

private static void AddQuoteToExistingSamuraiWhileTracked()
        {
            var samurai = _context.Samurais.FirstOrDefault();
            samurai.Quotes.Add(new Quote
            {
                Text = "I bet you're happy that I've saved you!"
            });
            _context.SaveChanges();
        }
```

```C#
private static void AddQuoteToExistingSamuraiNotTracked(int samuraiId)
        {
            var samurai = _context.Samurais.Find(samuraiId);
            samurai.Quotes.Add(new Quote
            {
                Text = "Now that I saved you, will you feed me dinner?"
            });
            using (var newContext = new SamuraiContext())
            {
                newContext.Samurais.Attach(samurai);
                newContext.SaveChanges();
            }
        }

private static void AddQuoteToExistingSamuraiNotTracked_Easy(int samuraiId)
        {
            var quote = new Quote
            {
                Text = "Now that I saved you, will you feed me dinner again?",
                SamuraiId = samuraiId
            };
            using (var newContext = new SamuraiContext())
            {
                newContext.Quotes.Add(quote);
                newContext.SaveChanges();
            }
        }
```


## Updating data
To update, retrive the required data, change it and save changes.
```C#
private static void RetrieveAndUpdateSamurai()
        {
            var samurai = _context.Samurais.FirstOrDefault();
            samurai.Name += "San";
            _context.SaveChanges();
        }

private static void RetrieveAndUpdateMultipleSamurais()
        {
            var samurais = _context.Samurais.Skip(1).Take(4).ToList();
            samurais.ForEach(s => s.Name += "San");
            _context.SaveChanges();
        }
```
As with adding data, EF core needs to update at least 4 objects to run a batch instead
of multiple db calls.

## Deleting data
Data cannot be instantly deleted, the data needs to be tracked first. Meaning we first have to retrive
the object, before removing it and saving the changes in the db.

```C#
private static void RetrieveAndDeleteASamurai()
        {
            var samurai = _context.Samurais.Find(18);
            _context.Samurais.Remove(samurai);
            _context.SaveChanges();
        }
```

## Attach
Important in disconnected scenarios. See related data -> adding