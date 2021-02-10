
# Combine streams

* map id to a string
* work with multiple data sources
* react to actions
* simplify template code

Combine multiple streams to a single stream (merge, concat).

Flatten higher-order observables into a single, flat stream (flattening operators, mergeAll).

Emit combined values from multiple streams and emit more complex observables

## combineLatest
Creates an observable with defined values using the latest values from each input observable.

`combineLatest([a$, b$, c$]).pipe()`

Any time any of the input observables emit a new value, a new observable is emitted. Only emits after all input observables has emitted at least one value!

```JS
_productsWithCategories = combineLatest([
    this._products, this.productCategoryService._productCategories
  ]).pipe(
    map(([products, categories]) =>
      products.map(product => ({
        ...product,
        price: product.price * 1.5,
        category: categories.find(c => product.categoryId === c.id).name,
        searchKey: [product.productName]
      }) as Product)
    )
  )
```

## forkJoin
Creates en observable with defined values using the last value from each input observable.

`forkJoin([a$, b$, c$]).pipe()`

Waits for all the input observables to emit all values, then emits an output stream only using the last value from each stream.

```js
forkJoin(this.get(url), this.get(underenhetUrl)).pipe(
    map(res => {
        //res contains the observable from both input observables, 
        //forkJoin does not pass through the entire pipe with one observable before doing the same with the next
        return res[0] || res[1];
    }),
    tap(company => console.log('company', company)),
    map(company => {
        return new CompanyInfo(company);
    })
);
```

If one of the observables never complete, forkJoin will never complete either. If any of the observables throws an error, forkJoin will also throw an error and all the other observables will be unsubscribed.

forkJoin completes in the example belove because get() returns something instead of just throwing an error.

```js
public get() {
    return this.http.get(url, { headers: headers }).pipe(
        catchError(error => {
            // throw(error)  would not let forkJoin complete and would cause a source.lift error
            return of(undefined);
        })
    );
}
```

## withLatestFrom
Creates an observable whose values are defined by using the latest values from each input observable if the source stream emits.

The source stream is here `a$`.
`a$.pipe(withLatestFrom(b$, c$))`

Works like `withLatest`, but only emits when the source stream emits a new value.