
# Update related data in many-to-many relationships
Only connected cases!

## Adding

### Already have both connecting cases
Have to add a entity of the connecting table. This require that there already
exists a entity of the two tables to connect

```C#
var join = new SamuraiBattle {SamuraiId = 1, Battle = 2};
_context.Add(join);
_context.SaveChanges();
```
Can use Add, Attach, Update directly on the context, as stated in basicOperations,
to add to a join table without creating a DbSet for it.


### Adding one connection case
Collect the already existing entity from the db and add a new join entity to this,
providing all the other required information.

```C#
//collecting battle with id 1
var battle = _context.Battle.Find(1);

//interacting with the main table instead of the join table
battle.SamuraiBattle.Add(new SamuraiBattle { SamuraiId = 21 });
_context.SaveChanges();
```

## Update and delete
write when have more complex examples, after games project