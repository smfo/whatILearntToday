
## Backend
ASP.net core web API (controllers, models, context, program)
Local SQL server
EF Core with LINQ queries

### Problems
**Collecting to local SQL database**
The example was set up with a InMemory database (where does this data even go?), change to a DbContext SQL server connection string using 
the deciered DB name

```C#
//Startup.js ASP.Net core web API

public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<TodoContext>(op => op.UseSqlServer(Configuration.GetConnectionString("TestSetup")));
            services.AddControllers();
        }
```


## Frontend
React Native, 


## Hosting