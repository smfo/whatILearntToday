
# Relationships

## Many-to-many
EF Core will not magically sort this out, we need to use a join entity.

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

EF Core needs some more information to map this to the database. To achive this the mapping
needs to be added at runtime.
```C#
protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<SamuraiBattle>().HasKey(s => new { s.SamuraiId, s.BattleId });
        }
```


## One-to-one
In a one-to-one relationship it is enough to specify a foreign key in the dependent end and add
a instance of this class to the non dependent end.
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

NB: the dependent end will always be considered by EF to be optional. A samuray does not HAVE to have a horse.
There is no way to apply this condition in EF Core, this has to be done in the bussines logic.