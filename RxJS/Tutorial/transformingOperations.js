
// Flattening operators: take an observable that emits and observable and only emits the 
// emitted observables values (as an observable)

import { mergeAll, mergeMap } from "rxjs/operators";

// mergeAll: takes an observable that outputs observables and merge them so only the observable values are emitted
// the observable emitted is the values itself, instead of the observable emitting an observable
// mergeAll()
const input$ = fromEvent(textInput, 'keyup');

input$.pipe(
    map(event => {
        const term = event.target.value;
        return ajax.getJSON(`https://api.github.com/users/${term}`)
    }),
    debounceTime(1000)
).subscribe(console.log);
// every second after the user is finished typing, an observable is emitted. 
// However as this is an observable it contains a lot of unnessecary data

input$.pipe(
    map(event => {
        const term = event.target.value;
        return ajax.getJSON(`https://api.github.com/users/${term}`)
    }),
    debounceTime(1000),
    mergeAll()
).subscribe(console.log);
// every second after the user is finished typing, the values of the observable 
// created in map is emitted

mergeMap:
mergeMap()