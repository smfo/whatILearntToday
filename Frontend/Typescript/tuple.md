
# Tuple

This type allow you to express an awway with a fixed number of elements whose types are known, but can differ from one another.

```js
// Declare a tuple type
let x: [string, number];

// Initialize it
x = ["hello", 10];

// Initialize it incorrectly
x = [10, "hello"];
```