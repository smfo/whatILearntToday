
# Logging in ASP.NET (Core)

To logg from a file in ASP.NET Core, or other projects, the class needs to inject a ILogger with
the selected classtype as a generic parameter.

Take care not to log sensitive information!

There are many methods to logg, one of which is LogInformation, that can take a message and parameters
to insert in that message. The parameters can be of any type, however their order and number must
match that in the message.

```C#
public class BookClubModel{

    private readonly ILogger<BookClubModel> _logger;

    public BookClub(ILogger<BookClubModel> logger){
        _logger = logger
    }

    public Book GetBook(int bookId){
        _logger.LogInformation("Getting {bookId} from database", bookId);
        return _context.Books().FirstOrDefault(x => x.Id == bookId);
    }
}
```

The logged messages can be filtered in the appSettings.json file. Example that only prints warnings from
microsoft.aspnetcore.
```json
"Logging": {
    "LogLevel": {
      "Microsoft.AspNetCore": "Warning"
    }
  },
```

## Serilog
Serilog is one of multiple available libraries for logging to a file.\
To use it install the Nuget packages: Serilog.AspNetCore, Serilog.Settings.Configuration, Serilog.Sink.File.

The program file needs to be changed in order to know where to post the file, and the appsettings.json
can be changed to decide which type of messages to log.

Shared file: when having multiple runnable projects the settings lets you chose if they can log to
the same file or not.

```C#
//Program.cs
public static IConfiguration Configuration { get; } = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appSettings.json", optional: false, reloadOnChange: true)
            .AddEnvironmentVariables()
            .Build();

public static void Main(string[] args)
        {
            Log.Logger = new LoggerConfiguration()
                .ReadFrom.Configuration(Configuration) // configuration needs to come from somewhere...
                //start logging, where to save the log files, shared file
                .WriteTo.File(new JsonFormatter(), @"c:\temp\logs\book-club.json", shared: true)
                .CreateLogger();

            try
            {   //First log to the file
                Log.Information("Starting web host");
                //template main method
                CreateWebHostBuilder(args).Build().Run();
            }
            catch (Exception ex)
            {
                Log.Fatal(ex, "Host terminated unexpectedly");
            }
            finally
            {
                Log.CloseAndFlush();
            }
        }
```

And add UseSerilog to the hostbuilder.
```C#
public static IHostBuilder CreateHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args)
            .UseSerilog() // <- Add this line
            .ConfigureWebHostDefaults(webBuilder =>
            {
                webBuilder.UseStartup<Startup>();
            });
```

Possible serilog logging options. This tells the program to log everything that is not a microsoft or
system warning to the debug window and the rest to the serilog file. Except specific messages to the logger.
```json
"Serilog": {
    "MinimumLevel": {
      "Default": "Debug",
      "Override": {
        "Microsoft": "Warning",
        "System": "Warning"
      }
    }
  }
```

## Logg metadata
**Log levels**\
There are multiple shortcuts to display the log level, including: LogInformation, LogWarning,
LogError og LogDebug.

**Categories**
To add a categori to all the log entries from a certain file, instead of adding a logger with the
class as a generic type, add a loggerfactory.\
This will be displayed as the source context in the log.

```C#
private readonly ILogger _logger;

public MyGames (ILoggerFactory logger)
{
  _logger = loggerFactory.CreateLogger("CategoryName")
}
```

**Filtering**
The filters in appsettings.json can be used to filter logs both using the generic type and the
custom categories.

```json
"Serilog": {
    "MinimumLevel": {
      "Default": "Debug",
      "Override": {
        "Microsoft": "Warning",
        "System": "Warning",
        "UserService": "Warning" //only logs warnings and errors from the custom category userservice
      }
    }
  }
```

**Scope**
Groups a set of logical operators. Add a scope to a operation using other methods, and if these
methods log anything, the scope message will be added to their logg line.
```C#
using (_logger.BeginScope("Start scope for getting users"))
                {
                    return Ok(_service.GetUsers());
                }
```

```json
{"Timestamp":"2020-09-28T14:55:09.4912331+02:00","Level":"Information","MessageTemplate":"Getting all users","Properties":{"SourceContext":"UserService","ActionId":"20ab8c2c-6cfe-4435-b150-f98120836ac4","ActionName":"MyGames.API.Controllers.UsersController.GetUsers (MyGames.API)","RequestId":"80000024-0001-fa00-b63f-84710c7967bb","RequestPath":"/api/Users","SpanId":"|557d4a31-484d5d58def1e4ab.","TraceId":"557d4a31-484d5d58def1e4ab","ParentId":"","Scope":["Start scope for getting users"]}}
```