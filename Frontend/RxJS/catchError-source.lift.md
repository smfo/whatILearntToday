
# CatchError

catchError catches errors on the observable handled by returning a new observable or throw an error.

Throw error. The pipe stops and won't emit any new values.
```JS
catchError(err => {throw 'error in source. Details: ' + err;})
```

Continue with different observable. The new observable is returned and the observer never knows that an error occured.
```js
catchError(err => of('I', 'II', 'III', 'IV', 'V'))
```

Retry with the caugth observable (similar to retry())
```js
catchError((err, caught) => caught)
```


## Error message source.lift
```js
source.lift is not a function
```

error created because of misplaced or missing catcherror operator

the operator shouldn't be sent as a parameter of any other RxJS operators, but added
after the relevant operator like all the others.

```js
map(result => {return ( do something)}),
catchError(error => this.handleError(error))
```

## Handling rethrown errors in the async pipe

Use pipe to catch the error as we are no longer using subscribe.

### EMPTY
Returns an empty observable.

```js
this._products = this.productService.getProducts()
      .pipe(
        catchError(err => {
          this.errorMessage = err;
          return EMPTY;
        })
      )
```