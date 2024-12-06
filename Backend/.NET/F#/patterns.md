# Patterns

In F# patters are fules used to transporm input data. They are used to compare data with a logocal structure, decompose data into parts and extractin information from data in various ways.

With composition you string functions together to create larger function patterns that can be used over. With pipelines you start with data and lead them through a set of functions

## Composition

Combines multiple functions together into one function.

`let <function name> = <function 1> >> <function 2>`\
The patterns takes two functions and returns a new function. `>>` is the composition operator-

```F#
let add2 a = a + 2
let multiply3 a = a * 3 
let addAndMultiply a =
    let sum = add2 a
    let product = multiply3 sum
    product

printfn "%i" (addAndMultiply 2) // 12

// Using the composition pattern
let add2 a = a + 2
let multiply3 a = a * 3 
let addAndMultiply = add2 >> multiply3

printfn "%i" (addAndMultiply 2) // 12
```

## Pipeline

Starts with a value, then sequentially calls multiple functions by using the output from one function as the input for the next.\
The pipeline operator `|>` takes a function and argument and returns a value

This is similar to fluent coding in C# (extension methods, LINQ)
```C#
// C#
var car =
    new Car(Color.Red)
        .Drive(10000)
        .Paint(Color.White);

// F#
let car =
    Car.create Red
        |> Car.drive 10000
        |> Car.paint White
```

```F#
let list = [4; 3; 1]
let sort (list: int list) = List.sort list
let print (list: int list)= List.iter(fun x-> printfn "item %i" x) list

list |> sort |> print 
// item 1 item 3 item 4
```

```F#
let cards = [21; 3; 1; 7; 9; 23]

let cardFace (card: int) :string = 
    let no = card % 13
    if no = 1 then "Ace"
    elif no = 0 then "King"
    elif no = 12 then "Queen"
    elif no = 11 then "Jack"
    else string no

let suit (card: int) :string =
    let no = card / 13
    if no = 0 then "Hearts"
    elif no = 1 then "Spades"
    elif no = 2 then "Diamonds"
    else "Clubs"

let shuffle list =
    let random = System.Random()
    // Using random as a sorting key
    list |> List.sortBy (fun x -> random.Next())

// Using specifiers
let printCard card = printfn "%s of %s" (cardFace card) (suit card) 

// With list as an input to List.iter
let printAll list = List.iter(fun x -> printCard(x)) list

// With 'no' and 'list' as inputs to List.take
let take (no:int) (list) = List.take no list

cards |> shuffle |> take 3 |> printAll

// take 3, using both the list provided by the pipeline and 3 as parameters
```

-> Why create a pipeline that only contains one function?\
THe Pipe operator is just a way to write the last argument of a function before the function call. I suppose this makes it clearer which data we are focusing on. This means you should list the primary argument of a function last in the signature so you can pipe it through

```F#
module Car =

    let create color =
        { Mileage = 0; Color = color }

// Where car is the primary argument
    let drive miles car =
        { car with Mileage = car.Mileage + miles }

// Where car is the primary argument
    let paint color car =
        { car with Color = color }
```