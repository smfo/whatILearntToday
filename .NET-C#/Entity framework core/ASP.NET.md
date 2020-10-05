
# Connect to ASP.Net Core application

The configuration of the database will happen in the asp.net startup file instead of
dbContext. The actual connectionstring will be stored in appsetting so it can be changed
according to environment.

Microsoft.Aspnetcore.Mvc.NewtonsoftJson needs to be installed with EF Core 3 to be
able to use ThenInclude. If using AddControllers, use the AddNewtonsoftJson below.

```C#
// startup
public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers().AddNewtonsoftJson(options =>
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);
            services.AddDbContext<MyGamesContext>(opt =>
                opt.UseSqlServer(Configuration.GetConnectionString("SqlConnectionString")).EnableSensitiveDataLogging()
                );
        }

// appSettings (add commands for logging and store the connectionstring)
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft": "Warning",
      "Microsoft.Hosting.Lifetime": "Information",
      "Microsoft.EntityFrameworkCore.Database.Command":  "Information" // add for logging
    }
  },
  // connectionstring
  "ConnectionStrings": {
    "SqlConnectionString": "Data Source = (localdb)\\MSSQLLocalDB; Initial Catalog = DatabaseName"
  }
```

To be able to initialize the context from the startup file, the context needs a constructor that takes
options as a parameter.
```C#
public MyGamesContext(DbContextOptions<MyGamesContext> options) : base(options)
{
    ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
}
```
Because this is a API the context will become disconnected, therefore it is just a waste of resources to
track the context from the get go. The line in the constructor makes tells dbcontext not to track anything
from this context.

Refactor the context file, remove the connection to the database and logging.

## Startup controller
Change the launch urls to the required one in Properties -> launchsettings (both places).\
The logging from the database ban be seen in the output window, show output from the ASP.NET project.