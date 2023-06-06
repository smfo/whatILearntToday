
# Testing with SQL Lite
SQL lite behaves much more similarly to a real relation database than InMemory, however in addition
to using a real database, SQL Lite can also be used with a in memory database.

Add the correct implementation of the connectionStringBuilder with a :memory: datasource and get
the options.

As with the SQL test database, the SQL Lite database has to be ensureCreated in each test, as well as 
opening the connection.

```C#
public void AddUser()
        {
            var connectionStringBuilder =
                new SqliteConnectionStringBuilder { DataSource = ":memory:" };
            var connection = new SqliteConnection(connectionStringBuilder.ToString());

            var options = new DbContextOptionsBuilder<MyGamesContext>()
                .UseSqlite(connection)
                .Options;

            using (MyGamesContext context = new MyGamesContext(options))
            {
                // Make sure to open the connection and create the db to access it
                context.Database.OpenConnection();
                context.Database.EnsureCreated();

                string user = "Elias";
                UserService _service = new UserService(context);
                User addedUser = _service.AddUser(user);
                Assert.AreNotEqual(0, addedUser.Id);
            }
        }
```

## Multiple context instances

When using multiple DbContext instances within the same test, do simulate disconnected behavior,
it is only nesecary to open the connection to and create the database in the first instance.
This is because we are using the same connectionstring in each instance. It is similar to using
a different db name for each test in InMemory testing. After the test, the same database
will no longer be accessible.

```C#
public void GetAuthors_PageSizeIsThree_ReturnsThreeAuthors()
        {
            // Arrange

            var connectionStringBuilder = 
                new SqliteConnectionStringBuilder { DataSource = ":memory:" };
            var connection = new SqliteConnection(connectionStringBuilder.ToString());

            var options = new DbContextOptionsBuilder<CourseContext>()
                .UseSqlite(connection)
                .Options;


            using (var context = new CourseContext(options))
            {
                context.Database.OpenConnection();
                context.Database.EnsureCreated();
                context.Countries.Add(new Entities.Country()
                {
                    Id = "BE",
                    Description = "Belgium"
                });

                context.Countries.Add(new Entities.Country()
                {
                    Id = "US",
                    Description = "United States of America"
                });

                context.Authors.Add(new Entities.Author()
                { FirstName = "Kevin", LastName = "Dockx", CountryId = "BE" });
                context.Authors.Add(new Entities.Author()
                { FirstName = "Gill", LastName = "Cleeren", CountryId = "BE" });
                context.Authors.Add(new Entities.Author()
                { FirstName = "Julie", LastName = "Lerman", CountryId = "US" });
                context.Authors.Add(new Entities.Author()
                { FirstName = "Shawn", LastName = "Wildermuth", CountryId = "BE" });
                context.Authors.Add(new Entities.Author()
                { FirstName = "Deborah", LastName = "Kurata", CountryId = "US" });

                context.SaveChanges();
            }

            using (var context = new CourseContext(options))
            {
                var authorRepository = new AuthorRepository(context);

                // Act
                var authors = authorRepository.GetAuthors(1, 3);
                
                // Assert
                Assert.Equal(3, authors.Count());
            }
        }
```

## Database behavior
Unlike InMemory test, SQLLite tests check DB behavior when adding data. F.ex. FK constraints as in the example below.


Example: An author has a required field CountryId. If there is no assigned countryId on AddAuthor the id of
"BE" will be used. However, this required that there exists a country with the id "BE". Using InMemory testing
this connection will not be checked, whereas with SQL Lite the test will fail if this requirement is not
fulfilled.

```C#
public class Author
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string FirstName { get; set; }

        [Required]
        [MaxLength(100)]
        public string LastName { get; set; }

        [Required]
        public string CountryId { get; set; }

        public Country Country { get; set; }
    }


    public void AddAuthor(Author author)
        {
            try
            {            
                if (author.CountryId == null)
                {
                    author.CountryId = "BE";
                }

                _context.Authors.Add(author);
            }
            catch (Exception)
            {
                throw;
            }
        }


public void AddAuthor_AuthorWithoutCountryId_AuthorHasBEAsCountryId()
        {
            var connectionStringBuilder = 
                new SqliteConnectionStringBuilder { DataSource = ":memory:" };
            var connection = new SqliteConnection(connectionStringBuilder.ToString());

            var options = new DbContextOptionsBuilder<CourseContext>()
                .UseSqlite(connection)
                .Options;


            using (var context = new CourseContext(options))
            {
                context.Database.OpenConnection();
                context.Database.EnsureCreated();

                // If a country with id BE does not exist, the test will fail
                context.Countries.Add(new Entities.Country()
                {
                    Id = "BE",
                    Description = "Belgium"
                });

                context.SaveChanges();
            }

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

            using (var context = new CourseContext(options))
            {
                var authorRepository = new AuthorRepository(context);
                var addedAuthor = authorRepository.GetAuthor(
                    Guid.Parse("d84d3d7e-3fbc-4956-84a5-5c57c2d86d7b"));
                Assert.Equal("BE", addedAuthor.CountryId);
            }
        }
```