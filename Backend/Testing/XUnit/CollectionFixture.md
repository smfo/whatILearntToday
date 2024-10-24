# Collection fixture

Use when you want to create a single test context and share it among tests in several test classes, as well as having it clean up after all tests when the test classes have finished.\
Examples of this can be a database fixture.

-> What is a fixture?

- Create a fixture class, and put the startup code in it's constructor. If there is any cleanup code, implement `IDisposable` and put the cleanup in a `Disposable()`
- Add the [CollectionDefinition(<CollectionName>)] attribute with an unique name and add it to a class that implements `ICollectionFixture<FixtureName>`
- Add the [Collection(<CollectionName>)] attribute to all test classes that will be part of the collection
- If the tests need access to the fixture instance, add this as a constructor argument

```F#
// 1)
type DatabaseFixture() =
    let connectionString =
        "Server=localhost,1433;User=sa;Password=<YourStrong!Passw0rd>;Database=arrangement-db"

    .....

    member this.getAuthedClient = defaultAuthenticatedWebapp.CreateClient()

    member this.getAdminClient = adminAuthenticatedWebapp.CreateClient()

    member this.getUnauthenticatedClient = unauthenticatedWebapp.CreateClient()

    member this.dbContext =
        let databaseConnection = new SqlConnection(connectionString)
        new DatabaseContext(databaseConnection, null)

// 2)
[<CollectionDefinition("Database collection")>]
type DatabaseCollection() =
    interface ICollectionFixture<DatabaseFixture>

// 3)
[<Collection("Database collection")>]
// 4)
type GetEvent(fixture: DatabaseFixture) =
    let authenticatedClient = fixture.getAuthedClient

    let unauthenticatedClient = fixture.getUnauthenticatedClient

    let clientDifferentUserAdmin = fixture.getAdminClient

    [<Fact>]
    member _.``Anyone can get event id by shortname``() =
        let shortname = Generator.generateRandomString ()

        let event = TestData.createEvent (fun e -> { e with Shortname = Some shortname })

        task {
            let! _, createdEvent = Helpers.createEvent authenticatedClient event
            let! _, content = Http.getEventIdByShortname unauthenticatedClient shortname
            useCreatedEvent createdEvent (fun createdEvent -> Assert.Equal($"\"{createdEvent.Event.Id}\"", content))
        }

    [<Fact>]
    member _.``External events can be seen by anyone``() =
        let event = TestData.createEvent (fun e -> { e with IsExternal = true })

        task {
            let! createdEvent = Helpers.createEventAndGet authenticatedClient event
            let! response, _ = Http.get unauthenticatedClient $"/events/{createdEvent.Event.Id}"
            response.EnsureSuccessStatusCode() |> ignore
        }
```