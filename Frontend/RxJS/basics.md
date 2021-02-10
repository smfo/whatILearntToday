# RXJS

Reactive extensions for javascript

- library based on observable manipulation
- stream of data that will be delivered over time
- observables are lazy and only execute after something has subscribed to it

`npm install --save rxjs`

## Multiple line functions
* Need curly brackets
* Does not have an implied return and must manually return a value (see map example)

## pipe
Stitches together functional operators to a chain. Sort of works as a container for the other operators.

```js
this.createUser(
  this.authConfig.waitUntilInitiated.pipe(
    filter((res) => res.config),
    map((config) => config.userInfoUrl),
    tap((config) => console.log("config", config))
  )
);
```

pipe is used on an observable

## tap
When placed in a pipe, tap can perform side effects on the observed data without
modifying the steam in any way. The stream that is sent in is the same as the stream emitts. Acts similar to then().

## filter
Filter the source observable and only emits those that satisfy a specific predicate.

## map
Transforms each emmited item based on a provided function, and emits the resulting values as an observable. Completes when the last value is emitted.

```js
of(2,4,6)
 .pipe(
   map(item => item * 2)
).subscribe(console.log)

//logs 4, 8, 12
```

```js
map(item => {
  if(item === 0){
    throw new Error('zero detected');
  }
  return item;
})
```

Map to object type. Use the spread operator instead of writing every single field in the object.
```js
products.map(product => ({
  ...product,
  price: product.price * 1.5,
  searchKey: [product.productName]
}) as Product);
```

## take
Emits a specific number of items from the input stream.

```js
of(2,4,6)
 .pipe(
   take(2)
).subscribe(console.log)

//logs 4, 8
```

```js
of(2,4 6)
 .pipe(
   tap(item => console.log(item)),
   map(item => item * 2),
   take(2),
   map(item => item - 3),
   tap(item => console.log(item))
 ).subscribe();

 // First performes all operations on 2: 2, 1
 // Then on 4: 4, 5
 // Have now taken 2 items and the pipe is finised
```