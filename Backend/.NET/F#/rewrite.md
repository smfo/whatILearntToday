# Rewrite Skjer

Have:\
F# application, functional, written with Giraffe. It's a small application\

Want to:
- Rewrite to C# ASP.NET Core
- Prefer to do it gradually
- Prefer not to have to temporarilly change api routes
- Want as little overhead as possible. Plugins, projects etc that has to be set up just for this period of time

Alternatives:

<details>
<summary>Reverse proxy</summary>

Need to run and host the proxy server and both applications.

**Proxy server**\
Acts as an intermediary between a client and a server in order tp perform processes like caching, traffic monitoring, access controll etc. The client requests access to a specific server, the proxy evaluates how to satisfy this request and contacts the target server on behalf of the client.

**Reverse proxy**\
A special type of server that hides the target server from the client. The client requests a resource and the proxy retrives said resource from another server and provides it to the client. The client does not know the resource comes from another server.

### Benefits
Load balancing - distribute request load among multiple servers\
URL rewriting - keep the urls in the system while prociding a more meaningfull url to the client\
Static content serving\
API gateway - single entrypoint for microservices\
Multiple website combinations - single entrypoint for multiple websites

### .NET Core
In .NET Core the way to intercept the HTTP request and recirect them to another server without the client knowing, is by implementing a middleware.This is a component that intercept HTTP request and responses and manipulates them as needed.

The middleware tries to create a target uri fomr the current HTTP context, the request submitted by the client. If a target uri is returned the request is forwarded to the target server, otherwise it cannot be processed by the current middlware and is passed to the next middleware in the pipeline.

```C#
// Example of BuildTargetUri method
// Looks for requests that start with /googleforms and replaces this with the google docs uri
// Whole example https://auth0.com/blog/building-a-reverse-proxy-in-dot-net-core/

private Uri BuildTargetUri(HttpRequest request)
{
  Uri targetUri = null;

  if (request.Path.StartsWithSegments("/googleforms", out var remainingPath))
  {
    targetUri = new Uri("https://docs.google.com/forms" + remainingPath);
  }

  return targetUri;
}
```

Add to the application by putting `app.UseMiddleware<MiddlewareName>()` to the `Configure()` method in `Startup.cs`. This adds the reverse proxy middleware to the HTTP pipeline, though UseMiddleware(). In short, looking at the example above, the default content sent to the browser is replaced with a link pointing to a google form via the unternal URI prefix /googleforms.

</details>

<details>
<summary>API Gateway</summary>
A management tool that acts as a single entrypoint for a group of microservices, handling requests and routing them the the correct service.

</details>

- Shared hosting of both projects, create custome Giraffe middleware
<details>
<summary>Shared hosting of both projects</summary>
Like with the reverse proxy this requires adding a middleware for Giraffe in the ASP.NET Core application. Unlike with reverse proxy, this middleware does not set the rules for each incoming request, but allows the ASP.NET application to also host and run the F# Giraffe application.

</details>

- Use feature toggles for each endpoint


<details> 
<summary> Reverse proxy vs API Gateway </summary>
An API gateway mainly facilitatesw and manages application level trafficing. While a reverse proxy focuses on networking concerns like load balending, security etc.\
API gateways are often more sophisticated, providing accitional features, while reverse proxies tend to be simpler and more focused on network and server efficiency and security.

While both API Gateways and Reverse Proxies manage traffic, they cater to different needs. An API Gateway is more about managing, routing, and orchestrating API calls in a microservices architecture, whereas a Reverse Proxy is about general server efficiency, security, and network traffic management. In practice, many modern architectures might use both, with an API Gateway handling application-specific routing and a Reverse Proxy managing general traffic and security concerns.
</details>

### Final solution

Call the `configure` and `configureServices` methods in the F# app from the C# application's Program.cs. This makes all the middleware available, and adds the pipeline of the F# project to the start of the C# project pipeline, as it is called first.

```C#
Log.Information("Starting web host");

var builder = WebApplication.CreateBuilder(args);
builder.Host.UseSerilog();

// Giraffe
App.configureServices(builder.Configuration, builder.Services, builder.Environment);
            
// asp.net
var startup = new Startup(builder.Configuration, builder.Environment);
startup.ConfigureServices(builder.Services);

var app = builder.Build();

// Giraffe
App.configureApp(app.Configuration, app);

// asp.net
startup.Configure(app, app.Environment);

app.Run();
```

The F# `configureServices` method adds the Giraffe endpoints, `services.UseGiraffe(webapp)` and the C# app later adds the mvc controller endpoints `app.UseEndpoints((ep) => ep.MapControllers())`.