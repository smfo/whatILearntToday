
# Shadow properties
A shadow property is a property that is available in the database and that EF Core is aware of,
but that the data model of that entity and the bussines logic is not aware of.\
This can be properties that will be used for sorting or filtering that will not be needed
in the user interface.

## Creating
Shadow properties are added to EF Core in the dbContext file, in OnModelCreating.

```C#
// Select which entity to use, what data type and shadow property name
modelBuilder.Entity<User>().Property<DateTime>("UserCreated");
```

### Add the same shadow properties to all tables
If it is decierable to add the same shadow properties to all the tables, this can be done using
a foreach.
```C#
foreach(var entityType in modelBuilder.Model.GetEnityTypes())
{
    modelBuilder.Entity<entityType.Name>.Property<DataTime>("Created");
    modelBuilder.Entity<entityType.Name>.Property<DataTime>("LastModified");
}
```

## Populating
Because the data model is not aware of the shadow properties, they cannot be populated by adding
a new object, or updating a object, in the database. They are modified by selecting the specific
entity of the datamodel, the shadow property and then setting the current value.\
This has to be done after the context is aware of the entity, so if it is new, add it to the 
database first.

```C#
User user = userFromFrontend;
// The context needs to be aware of the entity before we can access its properties
_context.Users.Add(user);
_context.Entity(user).Property("UserCreated").CurrentValue = DateTime.Now;
```

### Populating in context
The context can take care of updating the shadowproperties on SaveChanges instead of in every service method.

```C#
public override SaveChanges()
{
    // Find changed objects
    ChangeTracker.DetectChanges();
    var timestamp = DateTime.Now;

    // Define which objects to modify
    foreach(var entry in ChangeTracker.Entries()
        .Where(x => x.State == EntityState.Added || x.State == EntityState.Modified))
        {
            // Apply modifying logic
            entry.Property("LastModifies").CurrentValue = timestamp;

            if(entry.State == EntityState.Added){
                entry.Property("Created").CurrentValue = timestamp;
            }
        }

    return base.SaveChanges();
}
```
To check for a specific type use ```entry.Entity is typeName``` or ```x.Entity is typeName```.\
Remember to import Linq to the context file.

**Owned types**
In order to not try and modify the shadow properties to owned types, that do hot have these columns,
also add ```&& !e.Metadata.IsOwned()``` when selecting the objects to be modified.

## Querying
We can use EF.Property to query on shadow properties.
```C#
Users orderedUsers = _context.Users.OrderBy(x => EF.Property<DateTime>(x, "UserCreated"));
```

If it at some point is desierable to retrive the shadow property from the database, this is also
possible by using Select.

```C#
Users orderedUsers = _context.Users.Select( s => new { 
    Name = s.Name,
    CreatedAt = EF.Property<DateTime>(s, "UserCreated")
    });
```