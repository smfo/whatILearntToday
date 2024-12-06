# Authorization

ASp.NET has a `[Authorize]` attribute that can be placed on controllers, to restrict access to all endpoints in the file, or on specific endpoints.\
There is also a `[AllowAnonumous]` attribute that can be used to open an endpoint to all users even if the controller itself is marked with `[Authorize]`.

```C#
[Authorize]
public class AccountController : Controller
{
    [AllowAnonymous]
    public ActionResult Login()
    {
        // Can be accessed by anyone
    }

    public ActionResult Logout()
    {
        // Can only be accessed by authorized users
    }
}
```

Policy-based authorization gives you more flexibility.\
You can use custom authorization handlers with policies to add more complex logic than just checking if your user has a specific role. 
For example, you have some roles mappings in your database. You can create a policy that will check if your user is authorized according to that data or 
that can be any custom logic.\
You can also create a policy that only contains `.RequireRole("Admin")` which technically will do the same as an attribute `[Authorize(Roles = "Admin")]`.

## Roles

A user can belong to one or more roles. In some cases it is desierable that you have a certain role in order to access an endpoint. The role check is added in the attribute, like this

```C#
// Applies to the whole controller
[Authorize(Roles = BekkClaims.ReadBekk)]
public class BekkGroupsController : Controller
{
    ...
}

// Require MULTIPLE roles
[Authorize(Roles = "PowerUser")]
[Authorize(Roles = "ControlPanelUser")]
public class ControlPanelController : Controller
{
    public IActionResult Index() =>
        Content("PowerUser && ControlPanelUser");
}

// Require ONE of the listed roles
[Authorize(Roles = "HRManager,Finance")]
public class SalaryController : Controller
{
    public IActionResult Payslip() =>
                    Content("HRManager || Finance");
}
```

## Policy

A policy consists of one or more requirements that is registered as part of the authorization serivce config.

```C#
services.AddAuthorization(options =>
{
    options.AddPolicy("AtLeast21", policy =>
        policy.Requirements.Add(new MinimumAgeRequirement(21)));
});

services.AddAuthorization(options =>
{
    options.AddPolicy("ManagerAndEditor", policy =>
        policy.RequireRole("Manager")
              .RequireClaim("Permission", "Editor"));
});
```

Policies can be added to controllers with `[Authorize(Policy = <PolicyName>)]`.\
When multiple policies are nested, one on the controller another on the enpoint, ALL policies have to be pass to grant access.

```C#
[Authorize(Policy = "AtLeast21")]
public class AtLeast21Controller2 : Controller
{
    [Authorize(Policy = "IdentificationValidated")]
    public IActionResult Index() => View();
}
```

### Requirements
A specific condition that must be met for a policy to be considered successful. They encapsulate the logic needed to enforce the policy.

```C#
// Requirement
public class MinimumAgeRequirement : IAuthorizationRequirement
{
    public int MinimumAge { get; }

    public MinimumAgeRequirement(int minimumAge)
    {
        MinimumAge = minimumAge;
    }
}

// Handler
public class MinimumAgeHandler : AuthorizationHandler<MinimumAgeRequirement>
{
    protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, MinimumAgeRequirement requirement)
    {
        if (!context.User.HasClaim(c => c.Type == ClaimTypes.DateOfBirth))
        {
            return Task.CompletedTask;
        }

        var dateOfBirth = Convert.ToDateTime(context.User.FindFirst(c => c.Type == ClaimTypes.DateOfBirth).Value);
        int age = DateTime.Today.Year - dateOfBirth.Year;
        
        if (dateOfBirth > DateTime.Today.AddYears(-age))
        {
            age--;
        }

        if (age >= requirement.MinimumAge)
        {
            context.Succeed(requirement);
        }

        return Task.CompletedTask;
    }
}

// Startup
services.AddAuthorization(options =>
{
    options.AddPolicy("AtLeast18", policy =>
        policy.Requirements.Add(new MinimumAgeRequirement(18)));
});

services.AddSingleton<IAuthorizationHandler, MinimumAgeHandler>();

[Authorize(Policy = "AtLeast18")]
public IActionResult AgeRestricted()
{
    return View();
}
```

## Claims

A claim is a name value pair that represents pieces of information about a user, not what they can do. Claim-based authorization checks this value
and allow access to a resource based on that value.\
Claims requirements are policy based, these must be registered in the claim requirements.

```C#
services.AddAuthorization(options =>
{
   options.AddPolicy("EmployeeOnly", policy => policy.RequireClaim("EmployeeNumber"));
});

services.AddAuthorization(options =>
{
    options.AddPolicy("Founders", policy =>
                      policy.RequireClaim("EmployeeNumber", "1", "2", "3", "4", "5"));
});

[Authorize(Policy = "EmployeeOnly")]
public class VacationController : Controller
{
    public IActionResult Index()
    {
        return View();
    }

    public ActionResult VacationBalance()
    {
        return View();
    }

    // Open to everyone
    [AllowAnonymous]
    public ActionResult VacationPolicy()
    {
        return View();
    }
}
```