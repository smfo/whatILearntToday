
# Testing with InMemory provider

Install the NuGet package Microsoft.EntityFrameworkCore.InMemory to in the test
project.

The test project needs to reference the projects containing the models and dbContext, 
but not the project where the program is run from (at least not for the purly database related testing).

Make sure there is a constructor in the dbcontext that accepts general OptionBulders.
```C#
public MyGamesContext(DbContextOptions options) : base(options){}
```

In the test create a context builder and use InMemoryDatabase. The builder instance needs to be given
a name, so EF Core can keep unrelated contexts separated. Some times we want to use the same context in
multiple tests.
```C#
public void CanAddUserToDB()
        {
            var builder = new DbContextOptionsBuilder();
            builder.UseInMemoryDatabase("CanAddUser");

            using (MyGamesContext context = new MyGamesContext(builder.Options))
            {
                User user = new User();
                context.Users.Add(user);
                // Debug.WriteLine($"Before save: {user.Id}");

                // context.SaveChanges();
                // Debug.WriteLine($"After save: {user.Id}");

                Assert.AreNotEqual(0, user.Id);
            }
        }
```

NB: because the In Memory Provider does not really write to a database, but keeps the objects in a list,
it generates id's as the objects are added. Therefore, SaveChanges() doesn't really do anything.

## Multiple context instances
When working with disconnected data, we will not be using the same instance of the db context when interacting
with the database. Therefore we whould also write tests that use different instances of the InMemory database
during the test. It will still be the same database and contain the same data, as the option builder stays the 
same, but the instance will change when adding another using block.

Rule of thumb: every time a new http request is needed, there should be a new context instance.

```C#
public void AddAuthor_AuthorWithoutCountryId_AuthorHasBEAsCountryId()
        {
            var options = new DbContextOptionsBuilder<CourseContext>()
                .UseInMemoryDatabase($"CourseDatabaseForTesting{Guid.NewGuid()}")
                .Options;

            // Add to db
            using (var context = new CourseContext(options))
            {
                context.Countries.Add(new Entities.Country()
                {
                    Id = "BE",
                    Description = "Belgium"
                });

                context.SaveChanges();
            }

            // Add to db
            using (var context = new CourseContext(options))
            {
                var authorRepository = new AuthorRepository(context);
                var authorToAdd = new Author()
                {
                    FirstName = "Kevin",
                    LastName = "Dockx",
                    Id = Guid.Parse("d84d3d7e-3fbc-4956-84a5-5c57c2d86d7b")
                };

                authorRepository.AddAuthor(authorToAdd);
                authorRepository.SaveChanges();
            }

            // Get from db
            using (var context = new CourseContext(options))
            {
                var authorRepository = new AuthorRepository(context);
                var addedAuthor = authorRepository.GetAuthor(Guid.Parse("d84d3d7e-3fbc-4956-84a5-5c57c2d86d7b"));
                Assert.Equal("BE", addedAuthor.CountryId);
            }
        }
```

## Limitations
Does not test the database itself, but tests our code.
Cannot check for refernses, will allow for saving of entities that miss FK's

A good choise when database-specific features are not used a great amount and there
is no depentancy on relational features.