# High order mapping operators

High order observables are observables that emit an observable.

In order to subscribe to these inner observables we need to have nested subscriptions, like this. Why do we care about subscribing in the first place? Observables are lazy, if they are not subscribed to they won't execute.

```js
of(3,7)
  .pipe(
      map(id => this.http.get<Supplier>(`${this.url}/${id}`))
  ).subscribe(supplier => {
      supplier.subscribe
  });
```

Higher-order mapping operators allow us to do this without having nested subscriptions.

## concatMap
Waits for each inner observable to complete before processing the next one. Concatenates the outputs in sequence.

Transfers each emitted item to a new inner observable as defined by a provided function.

`concatMap(i => of(i))`

ConcatMap will wait for the http call for 2 to complete before starting to process the next observable.\
Because of this the user might experience lag if the execution of one observable takes a long time.
```js
of(2, 3)
.pipe(
    concatMap(id => this.http.get<Apple>(`${this.url}/${id}`))
).subscribe(console.log)
```

## mergeMap
Executes observables in parallel. and merges their results.

Transfers each emitted item to a new inner observable as defined by a provided function.

`mergeMap(i => of(i))`

MergeMap will execute the operations on an observable when it is emitted. If handling of the first observable takes longer than the second, the result of the second observable will be merged to the output first.
```js
of(2, 3)
.pipe(
    mergeMap(id => this.http.get<Apple>(`${this.url}/${id}`))
).subscribe(console.log)
```

## switchMap
Usefull when not wanting to finish processing observables if a new observable is emitted before the old one is finished.

Transfers each emitted item to a new inner observable as defined by a provided function.

`switchMap(i => of(i))`

If a new observable is emitted while another is being processed, the current inner observable is unsubscribed from, the processing is stoped and we switch to the new observable.
```js
of(2, 3)
.pipe(
    switchMap(id => this.http.get<Apple>(`${this.url}/${id}`))
).subscribe(console.log)
```