# Health check

ASP.NET core offers middleware and libraris to checkh the healt of app instrastructure components.

These health checks are exposed as HTTP endpoints and can be configured for various real-time monitoring scenarios. They are typically used with an external monitoring service that pings the endpoint at an interval.

By default all checks are run by the middleware. A subset of tests can be ran using Predicate, this filters the health checks based on their tags.

```C#
builder.Services.AddHealthChecks()
    .AddTypeActivatedCheck<SampleHealthCheckWithArgs>(
        "Sample",
        failureStatus: HealthStatus.Degraded,
        tags: new[] { "sample" },
        args: new object[] { 1, "Arg" });


app.MapHealthChecks("/healthz", new HealthCheckOptions
{
    Predicate = healthCheck => healthCheck.Tags.Contains("sample")
});
```

## Basic check

The app reports availability by responding processing requests.

A health check endpoint is created to respond with a health respond. By default no specific checks of dependencies or subsystems are registered. If the application responds it is good.\
The default response is a `HealthStatus` enum with `HealthStatus.Healthy, HealthStatus.Degraded, HealthStatus.Unhealthy`.

HealthCheck statuses can be registered with `AddHealthChecks`, and a health check endpoint is created by calling `MapHealthChecks`.

The example creates a endpoint at /healthz
```C#
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddHealthChecks();

var app = builder.Build();

app.MapHealthChecks("/healthz");

app.Run();
```

## Create chealth checks

The class have to implement the `IHealthCheck` interface.\
This has a `CheckHealthAsync` method that returns a `HealthCheckResult` of `Healthy, Degraded, Unhealthy`. This is written as a plaintext with a configurable status code.

```C#
public class SampleHealthCheck : IHealthCheck
{
    public Task<HealthCheckResult> CheckHealthAsync(
        HealthCheckContext context, CancellationToken cancellationToken = default)
    {
        var isHealthy = true;

        // ... Check health

        if (isHealthy)
        {
            return Task.FromResult(
                HealthCheckResult.Healthy("A healthy result."));
        }

        return Task.FromResult(
            new HealthCheckResult(
                context.Registration.FailureStatus, "An unhealthy result."));
    }
}
```

If an exception is thrown during the health checka new `HealthReportEntry` is returned with status sat to `FailureStatus`.

## Register health check services

Call `addCheck` on `AddHealthChecks`.

```C#
services.AddHealthChecks()
				.AddTypeActivatedCheck<HealthCheck>("general-check")
				.AddDbContextCheck<Db>("db-check");

builder.Services.AddHealthChecks()
    .AddCheck<SampleHealthCheck>("Sample");
```

Where SampleHealthCheck is the class that implements IHealthCheck.

### AddTypeActivatedCheck

Use this to pass arguments to a health check implementation.

```C#
builder.Services.AddHealthChecks()
    .AddTypeActivatedCheck<SampleHealthCheckWithArgs>(
        "Sample",
        failureStatus: HealthStatus.Degraded,
        tags: new[] { "sample" },
        args: new object[] { 1, "Arg" });
```

## Routing

Call `MapHealthChecks` on the endpoint builder with the endpoint url or relative path you want to create. Calling this endpoint will run all added health checks (by default, read intro to see filtering with tags).

### Require host

Require host(s) to specify which hosts are permitted to call the endpoint.

```C#
app.MapHealthChecks("/healthz")
    .RequireHost("www.contoso.com:5001");
```

## Probes

There are multiple types of probes that can be set up specifically. These include `AddSqlServer, AddDbContextCheck`.

### DbContext

The check confirms that the app can communicate with the database configured for the provided DbContext.

By default the `DbContextHealthCheck` calls EF Core's `CanConectAsync` method. This can be changed in the `AddDbContextCheck` overload.\
The name of the health check is the name of the TContext type (the DbContext supplied to the method).