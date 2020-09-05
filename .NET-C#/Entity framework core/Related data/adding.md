# Adding related data
It is possible to add related data at the same time as adding the main data. User will be added first, then
retrived with the new id from the database. This database will then be used to save the PlayedGame instance.

```C#
var user = new User
{
    Name = "Synne",
    PlayedGames = new List<PlayedGame> 
    {
        new PlayedGame
        {
            Name = "Hollow Knight",
            Score = 5
        }
    }
}

_context.User.Add(user);
_contest.SaveChanges();
```

If the User already exists this is retrived first and then the id is used to save the
played game. This method only works for connected data! As the user is being tracked after it
is retrived from the db.

```C#
var user = _ context.User.FirstOrDefault();
user.PlayedGames.Add(new PlayedGame
{
    Name = "Hollow Knight",
    Score = 5
});
_context.SaveChanges();
```

## Disconnected

This works for disconnected data, but will update the entire user object, not just the PlayedGames field.
```C#
var user = _ context.User.FirstOrDefault();
user.PlayedGames.Add(new PlayedGame
{
    Name = "Hollow Knight",
    Score = 5
});

using (var newContext = new MyGamesContext())
{
    _context.User.Update(user);
    _context.SaveChanges();
}
```

**Attach**
Using attach instead of update will start tracking the user object, but will set its status to unmodified. However, if
there are any enteties in user or that associated with user, like PlayedGame, that lacks a id this entity will be changed
to added.

This means that, when only using db generated keys, Attach can be used to start tracking a mix of new and existing entities where the existing entities have not changed. The new entities will be inserted while the existing entities will not be saved other than to update any necessary FK values.

```C#
var user = _ context.User.FirstOrDefault();
user.PlayedGames.Add(new PlayedGame
{
    Name = "Hollow Knight",
    Score = 5
});

using (var newContext = new MyGamesContext())
{
    _context.User.Attach(user);
    _context.SaveChanges();
}
```

An alternative to this is to have the FK on the child entity. This will then be added in a normal way, whereas
only the FK value in user will be updated.