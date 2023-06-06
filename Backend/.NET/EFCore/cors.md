
# CORS configuration in ASP.NET Core

There is two ways to add CORS policies in ASP.NET Core, using middleware and attributes. Middleware applies the policies to all endpoints
in the project, while attributes allow for applying policies to only some endpoints or applying different policies to different endpoints.
It is NOT recommended to mix these approaches.

The policies are defined in the StartUp file.

## Middleware
A policy to be used for all endpoints is set in the startup file.

```C#
//the policy name is the string saved here. The name is irrelevant
readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

public IConfiguration Configuration { get; }

// This method gets called by the runtime. Use this method to add services to the container.
public void ConfigureServices(IServiceCollection services)
{
    services.AddCors(options =>
    {
        // add policy with rules
        options.AddPolicy(MyAllowSpecificOrigins,
        builder =>
        {
            builder.WithOrigins("http://localhost:3000",
                                "http://exmaple.com");
        });
    });
    services.AddControllers();
}

// using MVC app.UseCours should be added before add.MVC
public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
           ...

            //adds the policies to all the endpoints
            app.UseCors(MyAllowSpecificOrigins);

            ...
        }
```

The policy does not have to be set as a string, but can be hardcoded as well.

## Attributes
Used to appliy different policies to different endpoints in the application.

The policies are set in the setup. Define one default policy and as many other policies as deciered.
```C#
public void ConfigureServices(IServiceCollection services)
    {
        services.AddCors(options =>
        {
            //default policy
            options.AddDefaultPolicy(
                builder =>
                {
                   
                    builder.WithOrigins("http://example.com",
                                        "http://www.contoso.com");
                });

            //policy named "AnotherPolicy"
            options.AddPolicy("AnotherPolicy",
                builder =>
                {
                    builder.WithOrigins("http://www.contoso.com")
                                        .AllowAnyHeader()
                                        .AllowAnyMethod();
                });

        });
```

"UseCors" is not added in the configuration, instead policies are added to the specific endpoints using attributes. Attributes can be added to
controllers, Razor page pagemodel and controller action methods.
```C#
[Route("api/[controller]")]
[ApiController]
public class WidgetController : ControllerBase
{
    [EnableCors("AnotherPolicy")] //Using named policy
    [HttpGet]
    public ActionResult<IEnumerable<string>> Get()
    {
        return new string[] { "green widget", "red widget" };
    }

    [EnableCors]        // Default policy.
    [HttpGet("{id}")]
    public ActionResult<string> Get(int id)
    {
        switch (id)
        {
            case 1:
                return "green widget";
            case 2:
                return "red widget";
            default:
                return NotFound();
        }
    }
}
```

It is also possible to add a [DisableCors] attribute for a specific controller/page-model/action.

## Policies

* The URL must not contain a trailing slach (/), this will result in an error and no header will be returned
* The CordPolicyBuilder method can chain methods

```C#
services.AddCors(options =>
    {
        options.AddPolicy(MyAllowSpecificOrigins,
        builder =>
        {
            builder.WithOrigins("http://example.com",
                                "http://www.contoso.com")
                                .AllowAnyHeader()
                                .AllowAnyMethod();
        });
    });
```

Some method options:
* AllowAnyOrigin: allows CORS for all origins with http or https
* SetIsOriginAllowedToAllowWildcardSubdomains
* AllowAnyMethod: allows any http method
* WithHeaders
* AllowAnyHeader