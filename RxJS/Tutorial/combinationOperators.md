
# Combination operators

Lets you combine multiple observables into a single stream

#### startWith, endWith:
StartWith begins by emitting the ovservable(s) passed to the operator before emitting the observables passed by the stream.\
`startWith(value)`

EndWith ends a stream by emitting the observables passed to the operator.\
`endWith(value)`

```javascript
const numbers$ = of(1,2,3);

numbers$.pipe(
    startWith('a', 'b', 'c'),
    endWith('a', 'b', 'c')
).subscribe(console.log);
```
Output: `a, b, c, 1, 2, 3, a, b, c`

#### concat:
Lets you construct one observable from a varibale number of other observables supplied. 
Concat will subscribe to the observables in the supplied order.\
When one observable is finished, concat will subscribe to another observable. If the previous observable
never finished, the next is not subscribed to.\
`concat(obs1$, obs2$)`
```javascript
const interval$ = interval(1000);
concat(
    interval$.pipe(take(3)),
    interval$.pipe(take(2))
).subscribe(console.log);
```

#### merge:
Merge will subscribe to multiple observable streams, joining them and emit values
from all of them as they occure.\
`merge(obs1$, obs2$)`
```javascript
const keyup$ = fromEvent(document, 'keyup');
const click$ = fromEvent(document, 'click');

merge(
    keyup$,
    click$
).subscribe(console.log);
```

#### combineLatest:
CombineLatest will make an inner subscription to all observables. When all observables have emitted at least one value,
combineLatest will emit an array of the latest value from each observable every time a new value is emitted.\
Before all observables have supplied a value, nothing will be emitted from the operator.\
`combineLatest(obs1$, obs2$)`
```javascript
combineLatest(
    keyupAsValue(([first, second]) => {
        return !isNaN(first) && !isNaN(second);
    }),
    map(([first, second]) => first + second)
).subscribe(console.log);

```
The example takes two numbers as input from the user and returns the sum of these.

CombineLatest is handy when updates are dependent on the latest value from multiple sources.

#### forkJoin:
Makes an inner subscription to all observable streams. When all streams have compleated, the operator
returns an array with the latest value emitted by all streams. forkJoin only emits once.\
`forkJoin(obs1$, obs2$)`
```javascript
const numbers$ = of(1,2,3);
const letters$ = of('a','b','c');

forkJoin(
    numbers$,
    letters$
).subscribe(console.log);
```
Output: `[3, 'c']`