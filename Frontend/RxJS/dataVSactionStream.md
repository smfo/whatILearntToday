
# Data stream vs action stream

Data streams collects the data requested and emits the response. After this the stream will not emit any new data and is basically dead, it won't re-execute or react to changes.

Action streams are open streams that react emits an item every time an action occurs. Keeps emitting new values until the stream is stoped.

## Combine streams
This code does not react when the category is changed by the user.\
The selectedCategoryId is updated whenever the user changes the category, but not the products in the list.
```JS
// Want _productsSimpleFilter to update whenever this variable updates
selectedCategoryId = 1;

// This is a data stream, meaning it dies after the values are retrived
_productsSimpleFilter = this.productService._productsWithCategories
    .pipe(
      map(products =>
        products.filter(product =>
          this.selectedCategoryId ? product.categoryId === this.selectedCategoryId : true
        ))
    )

// Triggered from view
onSelected(categoryId: number): void {
    this.selectedCategoryId = categoryId;
}
```

To make sure the products also gets updated, we can combine the data stream with an action stream so it will keep listening instead of dying.\
Now every time one of the streams in `combineLatest` is updated, _products will be updated as well.
```js
private categorySelectedSubject = new Subject<number>();
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

This will not provide a start value for the stream. Read why [here](reactToActions.md).