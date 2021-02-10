
## filter
Items that match the criteria specified in the provided function are returned.

`filter(item => item === 'Apple')`

## Subject
A subject is both an observable and an observer.

It is multicast, meaning multiple subscribers share the same stream. Unlike observables that are unicast and each observer get's it's own stream.

## BehaviorSubject
BehaviorSubject works the same way as a subject. In addition it provides an initial value to the constructor, and provides the current value to the observers when they subscribe, making sure they will always have a value.

Changing the example from [data vs action stream](dataVSactionStream.md) to use a behavior subject will give an initial value.

```js
// This will provide _categorySelectedAction with an initial value
private categorySelectedSubject = new BehaviorSubject<number>(0);
// Need to access the observable in order to use pipe
_categorySelectedAction = this.categorySelectedSubject.asObservable();

_products = combineLatest([
    this.productService._products,
    this._categorySelectedAction
])
.pipe(
    map(([products, selectedCategoryId]) =>
        products.filter(product =>
        product.category === category)
    )
)

// Triggered from view
onSelected(categoryId): void{
    this.categorySelectedSubject.next(+categoryId);
}
```

## startWith
A pipe operator that provides an initial value.

`startWith('Orange')`

This value is emitted to the stream before the source observable values.

Changing the example from [data vs action stream](dataVSactionStream.md) to use `startWith` to get an initial selected category will give an initial output value for the stream.
```js
private categorySelectedSubject = new Subject<number>();
// Need to access the observable in order to use pipe
_categorySelectedAction = this.categorySelectedSubject.asObservable();

_products = combineLatest([
    this.productService._products,
    // Setting the initial value of this stream
    this._categorySelectedAction
        .pipe(
            startWith(0)
        )
])
.pipe(
    map(([products, selectedCategoryId]) =>
        products.filter(product =>
        product.category === category)
    )
)

// Triggered from view
onSelected(categoryId): void{
    this.categorySelectedSubject.next(+categoryId);
}
```

## merge
Combines multiple streams by merging their emissions and output them as one stream containing all the emissions.

`merge(a$, b$, c$)`

## scan
Accumulates items in a stream.\
Takes a previous value and a current value as an input, apply a function to these and output a stream.

`scan((acc, curr) => acc + curr)`

Outputs a new observable where the current value is added to the list of the previous values.
```js
scan((acc: Product[], value: Product[]) => [..acc, value])
```