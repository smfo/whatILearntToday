
# Transformation operatprs
Flattening operators: take an observable that emits an observable and only emits the 
emitted observables values (as an observable)

#### mergeAll:
Takes an observable that outputs observables and merge them so only the observable values are emitted
The observable emitted is the values itself, instead of the observable emitting an observable.\
`mergeAll()`
```javascript
const input$ = fromEvent(textInput, 'keyup');

input$.pipe(
    map(event => {
        const term = event.target.value;
        return ajax.getJSON(`https://api.github.com/users/${term}`)
    }),
    debounceTime(1000)
).subscribe(console.log);
```

Every second after the user is finished typing, an observable is emitted. 
However as this is an observable it contains a lot of unnessecary data

```javascript
input$.pipe(
    map(event => {
        const term = event.target.value;
        return ajax.getJSON(`https://api.github.com/users/${term}`)
    }),
    debounceTime(1000),
    mergeAll()
).subscribe(console.log);
```
Every second after the user is finished typing, the values of the observable,
created in map, is emitted

#### mergeMap:
MergeMap does the work of map and merge in one operation. It takes the observables in the stream,
does something to them, and instead of returning the observable, returns the value of the observable.\
`mergeMap(() => interval$)`
```javascript
input$.pipe(
    mergeMap(event => {
        const term = event.target.value;
        return ajax.getJSON(`https://api.github.com/users/${term}`)
    }),
    deboundeTime(1000)
).subscribe(console.log);
```
This example does the same as the previous one.\
OBS: mergeMap does not limit the number of active inner observables and will follow this through their lifetime.

#### switchMap:
Maps each values to an observable, then flattens the observable. Unlike mergeMap, it only contains one inner observable
at a time. When a new observable is introdused, the previous observable connection is canceled.\
`switchMap(() => interval$)`

```javascript
const input$ = fromEvent(inputBox, 'keyup');

input$.pipe(
    pluck('target', 'value'),
    distingsUnitChanged(),
    switchMap( searchTerm => {
        return ajax.getJSON(
            `${BASE_URL}?by_name=${searchTerm}`
        )
    })
).subscribe(console.log)
```
The example emits a get request instantly while the user is typing. Using switchMap, older requests are canceled
imidiatly when the input is changed, which is okey as we only care about the response to the finished input. Using
mergeMap all requests would have been recived, not necessarily in the correct order.

#### concatMap:
Like mergeMap and switchMap, concatMap creates an inner subscription to the observables recived, flattens them and returns
their value. Unlike the previous two, concat map only subscribes to new observables when the previous one is completed. So when
a new observable is recived, it is queued until all observables reviced previously are finished.\
Use when you need to contain order of execution and the inner observables have finite lifespans.\
`concatMap(() => interval$)`
```javascript
const radioButton = document.querySelectorAll('.radio-option');

const answerChange$ = fromEvent(radioButtons, 'click');

answerChange$.pipe(
    concatMap(event => saveAnswer(
        event.target.value
    ))
).subscribe(console.log);
```

#### exhaustMap:
Like switchMap and concatMap, exhaustMap only holds one inner observable at a time. If an observable is emitted while there is already
an inner subscription, the later is ignored. When the inner observable finishes, a new inner subscription can be made to observables emitted
after this point in time.\
`exhaustMap(() => interval$)`
```javascript
const loginButton = document.getElementById('login');
const login$ = fromEvent(loginButton, 'click');

login$.pipe(
    exhaustMap(() => authenticateUser())
).subscribe(console.log);
```

#### catchError:
CatchError catches errors from an observalbe source, either throwing an error or returning a new observable.\
`catchError(e => of(e))`\
CatchError still compleates the observable, therefore if we want to continue the stream catcherror should not be
a part of the initial pipe.
```javascript
const input$ = fromEvent(inputBox, 'keyup');

input$.pipe(
    pluck('target', 'value'),
    distingsUnitChanged(),
    switchMap( searchTerm => {
        return ajax.getJSON(
            `${BASE_URL}?by_name=${searchTerm}`
        )
    }),
    catchError(error => return empty())
).subscribe(console.log)
```
This will finish the observable stream in switchMap.
```javascript
const input$ = fromEvent(inputBox, 'keyup');

input$.pipe(
    pluck('target', 'value'),
    distingsUnitChanged(),
    switchMap( searchTerm => {
        return ajax.getJSON(
            `${BASE_URL}?by_name=${searchTerm}`
        ).pipe(
            catchError(error => return empty())
        )
    })
).subscribe(console.log)
```
This will allow for another observable to continue the stream.\
Remember to retrun something useful that the subscription can handle.