# Giraffe

A functional web framework for F#, built on ASP.NET Core.

## HttpHandler

The main building block of Giraffe.\
A `HttpHandler` is a function that takes two curried arguments, `HttpFunc` and `HttpContext` and returns a `HttpContext` (wrapped in an `option` and `Task` workflow) when finieshed.

High level: The handler receives and returns an ASP.NET Core HttpContext object, meaning every HttpHandler function has full control over the incoming HttpRquest and resulting HttpResponse.

Each Handler can process the incoming HttpRewuest before passing it down the Giraffe pipeline by invoking the next HttpFunc, or short circuit by returning an option of Some HttpContext.\
If a handler does not want to process the request at all, it can return None. In this case another handler can pick up the request, or it will be defered to the next RequestDelegate from the ASP.NET Core pipeline.

Each Handler has the full HttpContext at its disposal and can decide whether it wants to return Some HttpContext, None or pass it on to the next HttpFunc.

### Compose (>=>)

The `compose` combinator combines two `HttpHandler` functions into one

```F#
let app = compose (route "/") (Successful.OK "Hello World")

let app = route "/" >=> Successful.OK "Hello World"

let app =
    route "/"
    >=> setHttpHeader "X-Foo" "Bar"
    >=> setStatusCode 200
    >=> setBodyFromString "Hello World"
```

<details>
  <summary>Why do you want to combine functions like this?</summary>

  compose folow the railway oriented programming model
  
  ### Railway oriented programming
  A model from functional programming

  **Function**: A block that transforms input to output. It has no state

  String.length takes a string as a input and outputs an integer. This can be visualised by two rails, connected to either side of the function.
  ![Alt text](img\tracks1.png)

  For `Optional.ofNullable(s).map(String::length)`. This function ensures that the length function is not applied to is the input is of type null.
  ![Alt text](img\tracks2.png)

  This function will return null for certain conditions. When the first character if not a.
  ```F#
  public String f(String s) {
    return (s.charAt(0) == 'a') ? null : s;
  }
  ```
  `Optional.ofNullable(s).map(f).map(g)`
  For this case we get the folloring track representation
  ![Alt text](img\tracks3.png)

  Optional monitors the ouput of f and changes track if required. This ensures that function g is not invoked on the empty track, where we already have a value null. This can be extended to handle many functions.

</details>


### Choose
Iterates through a list of handler functions and invokes each until the first handler returns a positive result

```F#
let routes: HttpHandler =
    choose
        [ POST
          >=> choose
                  [ routef "/api/events/%O/participants/%s" registerParticipation
                    route "/api/events" >=> isAuthenticated >=> createEvent ]
          PUT >=> choose [ routef "/api/events/%O" updateEvent ]
          GET
          >=> choose
                  [ ... ]
          DELETE
          >=> choose
                  [ routef "/api/events/%O" cancelEvent
                    routef "/api/events/%O/delete" deleteEvent
                    routef "/api/events/%O/participants/%s" (fun (eventId, email) ->
                        deleteParticipantFromEvent eventId email) ] ]
```