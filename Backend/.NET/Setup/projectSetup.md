# Project setup

**Startup.cs vs Program.cs**\
The Program file is where the application starts, whereas Startup is where a lot of the configuration of the application happens.\
The idea of having this in separate files is the Single Responsibility Principle from SOLID.

**Configure vs ConfigurationServices**\
Startup contains two methods `ConfigurationServices` and `Configure`.

`ConfigurationServices` is responsible for anablig verious features in the application, getting these services ready to use. Technically each service added here is being registered as an object in the dependency injection system. Here we enable other middleware libraries and adjust various parameters passed to a the Add method ex. services.AddAuthentication(...), services.AddAuthorization(...). It is also where we registed interfaces and classes for depencency injection.\
Middleware enabled is enabled in the application typically using `Add`

`Configure` defines the applications middleware pipeline. Each HTTP request received by the app will be processed by this pipeline, in order. To be able to use a middleware in this function, that is not available by default, it first has to be enabled in ConfigurationServices.\
Each middleware layer can make modifications and decide wheater to continue with the pipeline of exit early.\
Middleware is added to the pipeline by invoking `Use` extension methods.

**Launchsettings.json**\
This file describes how the application can be launched. And sets the environment for local machine development. Environmental values set in this file overrides values set in the system environment. This file is not deployed

### Host
On startup the app builds a host that encapsulates alle the app's resources (HTTP server implementation, middleware components, loggind, dependency injection, configuration). There are three hosts capable of running ASP.NET Core, where WebApplication is the default used from the templates .net.

`var app = builder.Build()`\
This method configures a host with a set of default options, such as use Kestrel as web server and enable IIS integration, load configuration from from `appsettings.json` and other configuration sources, send logging output to the console and debug providers..

### Config
Provides a configuration framework that gets settings as name-value pairs from an ordered set of configuration providers. Built in are providers such as .json and .xml files, environment variables and command-line arguments.\
When the configuration is loaded, values from environment variables override values from appsettings.json. Not to use with secrets.

### Environment
Environment is specified in the ASPNETCORE_ENVIRONMENT varable. This is read at app startup and stored in IWebHostEnvrionment. This is available anywhere via DI.

### Routing
A route is a URL pattern that routes to a handler. This is typically a Razor page, an action in an MVC controller or middleware. 