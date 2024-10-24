# F#

A programming language in the .NET sphere, it can be written to use functional progamming. Like Python it is indentation based

Benefits as of listed by microsoft
- Lightweight syntax: Write low-ceremony code and focus on the core logic of your application.
- Type inference and automatic generalization: Use the compiler to get the benefits of a statically typed language without explicitly defining your types.
- Immutable by default: Apply predictable & repeatable transformations to your data without worrying about side-effects.
- Powerful data types: Represent complex data & model domains using tuples, records, and discriminated unions.
- Pattern matching: Enforce correctness in your application's behavior using the compiler.
- Asynchronous programming: Support for asynchronous workflows out of the box.



**Function**\
`let <function name> <parameters> = <function body>`\
There is no `return` keyword, as the information on the last line is what's being returned

```F#
// Define a function 'from' that takes one parameter 'whom'
let from whom = sprintf "from %s" whom

// Call the function
let message = from "F#" 
```

**Immutable**\
By default, all F# variables are immutable. To make variables mutable, use the `mutable` keyword.
```F#
let mutable name = "Chris"

// this statement is now allowed
name <- "Luis" 
```

**Formatting**\
While it is possible to use interpolation with F#, the most common way to put variables in strings are with specifiers

```F#
// Interpolation
let name = "Luis"
let company = "Microsoft"
printfn $"Name: {name}, Company: {company}"

// Specifier
let name = "Chris"
printf "Hi %s" name
```

- `s%` used for strings
- `%d, %i` used for decimals and integers
- `%b` used for boolean

**Convert to other datatype**
```F#
let first = "32"
let numberVersion =  int first 
printfn "Number %i" numberVersion
```

**List operators**\
An imutable collection of values of the same type.
```F#
// Create a new list, with an element appended to the beginning of the new list
let cards = ["Ace"; "King"; "Queen"]
let newList = "Jack" :: cards // "Jack", "Ace", "King", "Queen"

// Append entire list
let cards = ["Ace"; "King"; "Queen"]
let otherCardList = ["Jack"; "10"]
let fullList = cards @ otherCardList // "Ace", "King", "Queen", "Jack", "10"
```

**Currying**\
Taking a function with multiple parameter and rewriting it as a series of new functions, that each only take one parameter. This is done automatically by the compiler.

## Typesafe - type inference

F# is typesafe, but the parameters does not specify a type. How does that work?

The code below will give a compilation error because F# has infered from line 2 that the parameter inputs are of type int. However, if this line did not exist, line 3 would pass just fine. First use infer the type of the parameters.

```F#
let add a b = a + b
let sum = add 2 2 
// will give compilation error
let concat = add "hello" "world" 
```

If you want to be explicit about parameter and return types, you can do it like so
```F#
// let <function name> (<parameter>:<parameter type>) :<return type>= <function body>
// let <function name> (<parameter>:<parameter type>) (<parameter>:<parameter type>) :<return type>= <function body>

let convert (a:string) :int =
    int a
```

## Discriminated unions

Discriminated unions are reference types

Provice support for values that can be one of a number of named cases, like Enums, where each case can be a different value and type, unlike Enums.

```F#
[ attributes ]
type [accessibility-modifier] type-name =
    | case-identifier1 [of [ fieldname1 : ] type1 [ * [ fieldname2 : ] type2 ...]
    | case-identifier2 [of [fieldname3 : ]type3 [ * [ fieldname4 : ]type4 ...]
```

```F#
// ProjectState can be a type Archived or a type Active
// In the case of Active, you also have to specify a value Maintainer of type string
type ProjectState =
    | Archived
    | Active of {| Maintainer: string |}

type GitHubProject =
    { ProjectName: string 
      Stars: int
      State: ProjectState
    }

// Valid GitHubProject instanses
let corefxlab = 
    {
        ProjectName = "corefxlab"
        Stars = 1500
        State = Archived
    }

let fsharp = 
    {
        ProjectName = "dotnet/fsharp"
        Stars = 2800
        State = Active {| Maintainer = "F# team" |}
    }
```

This lets us enforce that a Maintaner will be set whenever the state is Active, as supposed to using a normal class. There we could either set Maintainer as optional, leting you create an Active GitHubProject without one, or an Archived project with a Maintainer. Or we would have to enforce the field, however allowing it to be nullable.

```F#
type GitHubProject = {
    ProjectName: string
    Stars: int
    State: ProjectState
    Maintainer: string option // Optional
}
```

Discriminated unions are also well suited to represent small hierarchial structures and tree data structures

```F#
// Enum
type ShapeEnum =
    | Circle = 0
    | Square = 1
    | Rectangle = 2

// Discriminated union
type ShapeDU =
    | Circle of double
    | Square of double
    | Rectangle of double * double

// Class hierarchy
public abstract class Shape {..}

public class Circle : Shape {..}

public class Square : Shape {..}

public class Rectangle : Shape {..}
```

## Pattern matching
https://learn.microsoft.com/en-us/dotnet/fsharp/language-reference/pattern-matching

`match <variableName> with`\
The match expression examines each patttern in turn to see if the input data is compatible with the patterns. When a match is found, the condition for the pattern is executed.\
Because pattern matching is a static construct for static types the compiled can verify that you have covered all cases, detect branches that will never match and provide an efficient implementation.

```F#
match expression with
| pattern [ when condition ] -> result-expression
| pattern [ when condition ] -> result-expression
...
```

-> pattern matching vs switch\
Constant patterns can be compared to swith case in other languages. These only have constant patterns

```F#
// Example of constant pattern
[<Literal>]
let Three = 3

let filter123 x =
    match x with
    // The following line contains literal patterns combined with an OR pattern.
    | 1 | 2 | Three -> printfn "Found 1, 2, or 3!"
    // The following line contains a variable pattern.
    | var1 -> printfn "%d" var1

for x in 1..10 do filter123 x
```

Some example that are not constant
```F#
let function1 x =
    match x with
    | (var1, var2) when var1 > var2 -> printfn "%d is greater than %d" var1 var2
    | (var1, var2) when var1 < var2 -> printfn "%d is less than %d" var1 var2
    | (var1, var2) -> printfn "%d equals %d" var1 var2

function1 (1,2)
function1 (2, 1)
function1 (0, 0)


let printOption (data : int option) =
    match data with
    | Some var1  -> printfn "%d" var1
    | None -> ()
```