
# The Async pipe

* Automatically subscribes to the observable when component is initialized
* returns each emitted value
* when a new value is emitted, the component is marked to be checked for changes
* unsubscribes automatically when the component is destroyed

```JS
products: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.sub = this.productService.getProducts()
      .subscribe(
        products => this.products = products,
        error => this.errorMessage = error
      );
  }
```

Using async pipe, use an observable.
```JS
_products: Observable<Product[]>;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this._products = this.productService.getProducts();
  }
```

## Use the async values in the view
```html
<table class="table mb-0"
             *ngIf="products">
        
        <tbody *ngFor="let product of products">
          <tr>
            <td>{{ product.productName }}</td>
            <td>{{ product.productCode }}</td>
          </tr>
        </tbody>
      </table>
```

With async values, add `'observableName'| async as 'variableName'`.
This pipes the values of the observable `_products` through and gets the values of the observable. The variable name chosen for the observable values can be used throughout the view as a normal vaiable. The html pipe automatically subscribes and unsubscribes.
```html
<table class="table mb-0"
             *ngIf="_products | async as products">
        
        <tbody *ngFor="let product of products">
          <tr>
            <td>{{ product.productName }}</td>
            <td>{{ product.productCode }}</td>
          </tr>
        </tbody>
      </table>
```