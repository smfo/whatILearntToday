# Keywords and functions

- `fun` - use for a anonomous function, lambda expression
- `<-`  assigne new value to variable
```F#
let mutable name = "Jens"
name <- "Lars"
```
- `|>` [pipeline](patterns.md)
- `>>` [composition](patterns.md)
- | - used in defining of enums, discriminated union and `match .. with`
- `member` public class properties and public methods are prerequisite with this keyword
- [| ... |] syntax for an array

## Giraffe

- `>=>` used to replace the `compose` keyword in [Giraffe](giraffe.md)