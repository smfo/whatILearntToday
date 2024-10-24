# More about config

Provides a configuration framework that gets settings as name-value pairs from an ordered set of configuration providers. Built in are providers such as .json and .xml files, environment variables and command-line arguments.\
When the configuration is loaded, values from environment variables override values from appsettings.json. Not to use with secrets.

The prefered way to read config values if by using the options pattern.

```C#
// appsettings.json
"Position": {
    "Title": "Editor",
    "Name": "Joe Smith"
  }

// Options model
public class PositionOptions
{
    public const string Position = "Position";

    public string Title { get; set; } = String.Empty;
    public string Name { get; set; } = String.Empty;
}
```

The options class must be
- Non-abstract
- Have public read-write properties of the same type as the cooresponding item in the config
- Have read-write properties bound to matching entries in the configuration

The following code binds the PositionOptions class to the Position section of the config.

```C#
// Using configurationBinder
public class Test22Model : PageModel
{
    private readonly IConfiguration Configuration;

    public Test22Model(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    public ContentResult OnGet()
    {
        var positionOptions = new PositionOptions();
        Configuration.GetSection(PositionOptions.Position).Bind(positionOptions);

        return Content($"Title: {positionOptions.Title} \n" +
                       $"Name: {positionOptions.Name}");
    }
}
```

An alternative approach is to bind the section of the config file and add it to the DI service container. Like below

```C#
// Using DI
using ConfigSample.Options;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorPages();

// Add to DI service container
builder.Services.Configure<PositionOptions>(
    builder.Configuration.GetSection(PositionOptions.Position));

var app = builder.Build();

// Refering to values using DI
public class Test2Model : PageModel
{
    private readonly PositionOptions _options;

    public Test2Model(IOptions<PositionOptions> options)
    {
        _options = options.Value;
    }

    public ContentResult OnGet()
    {
        return Content($"Title: {_options.Title} \n" +
                       $"Name: {_options.Name}");
    }
}
```

### Security
By default the user secrets configuration source is registered after the JSON config sources. Therefore the secret keys are seen as more important than the onec from config, and overrwrite these values.

#### Environment
-> Why have a `appsettings.development.json` file instead of putting all of this as default in `appsettings.json`. It is overriden in other environments anyways. Especially if the same values are to be used locally
- `appsettings.development.json` will override values in `appsettings.json`. Values containing localhost will have to be provided from `appsettings`, then overridden in the development invironment
- Sensitive information like connection strings, API keys etc should not be stored in `appsettings` that will be checked into source control. `development` can be excluded from this if needed
- Having separate files makes it easier to manage deployments across multiple environments without movifying the base `appsettings` file
- Developer might need different local settings depending on their setup
- The base method changes less frequently than the environment files. This leads to cleaner version control and less conflicts