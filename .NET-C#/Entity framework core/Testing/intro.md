
# Intro to testing with EF Core
 There are multiple things that can be tested

 - The communication between the DbContext and the database
 - Businesslogic not involving the db directly
 - BusinessLogic that also require a call to the db and a respons

 The problem with testing this is the database. Maybe it's not available, maybe we don't
 want to contaminate the data (this can be solved by using a different database, change the name
 in the connection string) there etc. Answer, make a mock db.

 ## Tests against a real db
 The most important things to be aware of then testing agains a real db is to not use your
 production database, to delete everything in it and to make sure it is created before starting testing.
 If these last two things are not done the tests are not really repetable.\
 Also, db creation takes a long time.

 ```C#
 [Test]
        public void CanAddUserToDB()
        {
           using (MyGamesContext context = new MyGamesContext())
            {
                context.Database.EnsureDeleted(); // delete db
                context.Database.EnsureCreated(); // create db
                User user = new User();
                context.Users.Add(user);
                Debug.WriteLine($"Before save: {user.Id}");

                context.SaveChanges();
                Debug.WriteLine($"After save: {user.Id}");

                Assert.AreNotEqual(0, user.Id);
            }
        }
```

In the DbContext, create a default constructor so that projects that don't configure the database by
itself can initiate the context. Then add a OnConfiguring method that connects to the database if this
constructor is used. Make sure to use a test database.

```C# 
public MyGamesContext(){}

protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Data Source = (localdb)\\MSSQLLocalDB; Initial Catalog = MyGamesTest");
            }
        }
```