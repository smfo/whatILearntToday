
# Relationships
When adding a many to __ relationship the requires the use of a list, instanciate an empty
list in the constructor so there is no error upon adding the first element.

## Many-to-many (two times one to many)
EF Core will not magically sort this out, we need to use a join entity. What is ecentially done is creating
two one to many relationships via a join table.

The join entity needs to contain an id for both tables, and the join enity needs to be initiated
the two other classes.
```C#
public class Battle
    {
        public Battle()
        {
            SamuraiBattles = new List<SamuraiBattle>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public List<SamuraiBattle> SamuraiBattles { get; set; }
    }

public class Samurai
    {
        public Samurai()
        {
            Quotes = new List<Quote>();
            SamuraiBattles = new List<SamuraiBattle>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public List<Quote> Quotes { get; set; }
        public Clan Clan { get; set; }
        public List<SamuraiBattle> SamuraiBattles { get; set; }

    }

    // join entity class
    // Ids to both the assosiated table are required
public class SamuraiBattle
    {
        public int SamuraiId { get; set; }
        public int BattleId { get; set; }
        public Samurai Samurai { get; set; }
        public Battle Battle { get; set; }
    }
```
**The joing table**\
Foregin keys to both tables are required, however the entities are optional. If you should include them or
not depends on how you plan to query the tables.

EF Core needs some more information to map this relationship to the database. 
However, a DbSet definition of the join table is not requiered as they will not be directly queried by the user. 
To achive this the mapping needs to be added at runtime.

```C#
protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<SamuraiBattle>().HasKey(s => new { s.SamuraiId, s.BattleId });
        }
```


## One-to-one
In a one-to-one relationship it is enough to specify a foreign key in the dependent end and add
a instance of this class to the non dependent end.

NB: the dependent end will always be considered by EF to be optional. A samurai does not HAVE to have a horse.
There is no way to apply this condition in EF Core, this has to be done in the bussines logic.

```C#
public class Horse
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int SamuraiId { get; set; } // Foreign key
    }

public class Samurai
    {
        public Samurai()
        {
            Quotes = new List<Quote>();
            SamuraiBattles = new List<SamuraiBattle>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public List<Quote> Quotes { get; set; }
        public Clan Clan { get; set; }
        public List<SamuraiBattle> SamuraiBattles { get; set; }
        public Horse Horse { get; set; } // Horse instance
    }
```