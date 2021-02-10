
# Dependency injections in .NET

Dependency injection set of design principles and patterns that allows for loosely coupled code. Loosely coupled code is when
components has/make use of very little knowledge of the definition of other components. The benefit of this is that
it is really easy and quick to swop out layers in the application. Ex. what type of file is being read from, or if its
a database instead, because the layer next to it only knows what methods the layer has, what it should input in those
and that types are returned. The layer does not decide the type of another layer. For testing this means that layers can
easily be replaced by fake/mock layers so we have full isolation of the application when testing.

Loosen up tight coupled code by using interfaces. Ex, between a controller (code that returns data to the frontend) and the
service connected to the database.


## Constructor injection
In this code it is the model views responsibility to chose what type of datareader to use. Thats right coupling.
```C#
// loosening code by using interfaces
protected IPersonReader DataReader;

public PeopleModelView()
{
    DataReader = new ServiceReader();
}
```

So we rewrite the code to take a datareader as an injection instead.
```C#
// loosening code by using interfaces
protected IPersonReader DataReader;

public PeopleModelView(IPersonReader dataReader)
{
    DataReader = dataReader;
}
```
This shifts the responsibility of deciding what datareader to use, to the component initialising the model
view. This is not always desierable, and this component might want to take the reader type as an injection
as well.

In the end, the file that runs the program should be the one to decied on the specifics of the configuration.

### ASP.NET Core
Specific instances in ASP.NET Core projects are added in the SetUp ConfigureServices method. This has a 
IServiceCollection injection that lets us add all the services in the application. The controllers and their 
injections are already added, using services.AddControllers.
Services can be added like this:
```C#
services.AddScoped<interface, specific instance>();
```
If some method is asking for a interface of this type, they will get an instance of the type provided.\
ASP.Net finds the injections it needs from the other Add methods and provides these automatically when creating
the new instance.

The same Add methods can also be used for context files, however, if only one contest is used AddDeContext is used.

**AddSingleton**\
Creates the service one time. This instance will be used throughout the run of the program. For some reason
this gave threw a SystemAggregationException in the program (MyGames).

**AddTransient**\
Creates a new instance of the service every time it is called.

**AddScope**\
Creates a new instance of the service every time it is called in a new scope. Ex. the instance called during
one http request will be the same, and a new instance will be created with the next request.

## Property injection
The layer creates a new instance of the type it wants to use for the next layer, ex. data connection type, like
what is being done with tight coupling.

```C#
//public variable
public ICSVFileLoader FileLoader { get; set; }

        public CSVReader()
        {
            string filePath =
                AppDomain.CurrentDomain.BaseDirectory + "People.txt";
            FileLoader = new CSVFileLoader(filePath); // Initialicing a specific type of fileLoader
        }
```
The difference from a tight coupled project, is that the instance variable is public. This allows other files, ex.
test files, to replace the variable as long as that type implements the correct interface.

```C#
[TestMethod]
        public void GetPeople_WithGoodRecords_ReturnsAllRecords()
        {
            var reader = new CSVReader();
            // replacing the initial value of the FileLoader with a different FileLoader type
            reader.FileLoader = new FakeFileLoader("Good");

            var result = reader.GetPeople();

            Assert.AreEqual(2, result.Count());
        }
```

## Vs
Constructor injection is good when wanting to force the user to make a desition regarding what depencendy
to use. If this dependency is not provided the program will not run.\
If there is a default dependency we want to use most of the time, property injections are a better alternative
as they will use this default if nothing else is specified. However, they give the option to replace this
if desiered.

## Containers
Instead of manually implementing all the layers and initialising classes, there are many tools
 that will do that for you. These are called dependency injection containers.\
An example is the method that is described for ASP.NET above, by using the IServiceCollection.