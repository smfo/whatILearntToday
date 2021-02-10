
# Creating observables

## of
Converts the passed argument to an observable sequence. Each argument becomes a next notification unlike `from`, there is no flattening and each argument is emitted in whole as a separate next notification. `of` only accepts values.

```js
of(10, 20, 30)
of([])
of([1,2,3])         here there is one argument [1,2,3]
```


## from
creates an observable of an array, an array-like object, a promise, an interable object or an 
observable-like object. converts almost everything to an observable. `from` accepts more types than `of` and uses conversion to make them into observables.

```js
from([10,20,30])    here there are 3 arguments 10, 20, 30
```

`from` also accepts functions.
```js
function* generateDoubles(seed) {
   let i = seed;
   while (true) {
     yield i;
     i = 2 * i; // double it
   }
}
 
const iterator = generateDoubles(3);
const result = from(iterator).pipe(take(10));
```

`from` accepts a function that doubles the seed it recives.