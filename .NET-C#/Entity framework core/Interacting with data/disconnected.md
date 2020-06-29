
# Disconnected scenarios

When the users don't have a connection to the database.\
This means the context won't be tracking the data. Because of this it is up
to the programmer to inform the context about the object state.

```C#
private static void QueryAndUpdateBattle_Disconnected()
        {
            var battle = _context.Battles.AsNoTracking().FirstOrDefault();
            battle.EndDate = new DateTime(1560, 06, 30);
            //simulating a disconnected scenario by using a seperate state
            using (var newContextInstance = new SamuraiContext())
            {
                newContextInstance.Battles.Update(battle);
                newContextInstance.SaveChanges();
            }
        }
```

In a disconnected scenario EF Core is told that something has been change, with the use of
Update(), but it does not know what. So all values in the Battle object are queried as changes.

**AsNoTracking()**
Don't track the results of the query.
This returns a query, not a DbSet. It will still be possible to use LINQ on it.

As default we can chose not to track any queries in the context to save resources.
```C#
public class SamuraiContextNoTracking : DbContext
{
    public SamuraiContextNoTracking(){
        ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
    }
}
```

## Updating related data
Set the state of the related data to modified. This prevents all the related data of the data object
from being updated and only updates the specific instance.

```C#
private static void ModifyingRelatedDataWhenNotTracked()
{
    var samurai = _context.Samurais.Include(s => s.Quotes).FirstOrDefault(s => s.Id == 2);
    var quote = samurai.Quotes[0];
    quote.Text = "Did you hear that again?";
    using (var newContext = new SamuraiContext())
    {
        //This would have updated all the quotes, not just the one that have changed
        //newContext.Quotes.Update(quote);
        newContext.Entry(quote).State = EntityState.Modified;
        newContext.SaveChanges();
    }
}
```