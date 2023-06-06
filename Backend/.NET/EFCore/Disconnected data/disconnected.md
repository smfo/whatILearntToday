
# Disconnected scenarios

Connected scenarios happen when the user is connected to the database, all through from when the data is collected to the
data changes are saved. This makes it possible for the database to track what is happening with
the data and what changes are being made. So if a object is updated, the database knows this and also which fields
have been changed. This is the case if there is a local storage or the database has a network connection
to the client.

However, if we are using a website with a web api or a service, we have disconnected scenarios. This means that
there is one instance of the context for each client, which is very resourceful. So after this has done it's job
for the one database interaction, like getting data, the context is deleted. What happens to the data now is not
tracked by the context. If this is then saved to the database again, using a new context, the context has no
idea what has changed or if this is a new object. So before saving the changes, the program has to tell
the new context that the data is modified. The context now knows this data has changed, but doesn't know which
fields and therefore replaces the entire object.

## Update
Update is used to tell the context the object has changed since retrived from the database.

```C#
private static void QueryAndUpdateBattle_Disconnected()
        {
            var battle = _context.Battles.AsNoTracking().FirstOrDefault();
            battle.EndDate = new DateTime(1560, 06, 30);

            //simulating a disconnected scenario by using a new context
            using (var newContextInstance = new SamuraiContext())
            {
                //The update method tells the context this data has been modified
                newContextInstance.Battles.Update(battle);
                //The dbset can then be saved
                newContextInstance.SaveChanges();
            }
        }
```

## Tracking (purposfully disconnected)
Some times it is preferable not to track data, to save resources. In that case it is possible to
chose that the data will not be tracked.

It is possible to chose to not track the resultes from a specific query using **AsNoTracking()**, like in
the example above.
This returns a query, not a DbSet, however it is still possible to use LINQ queries on it.

As default we can chose not to track any queries in the context, by using a changetracker and **NoTracking()**
in the DbContext constructor.

```C#
public class SamuraiContextNoTracking : DbContext
{
    public SamuraiContextNoTracking(){
        ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
    }
}
```