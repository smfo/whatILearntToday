
// introduction to operators

import { pipe, of, fromEvent, observable, from } from "rxjs"
import { map, pluck, filter, mapTo, reduce, scan } from "rxjs/operators"

// pipable: functions that are ran inside the pipe() operator
// applying operators does not change the existing observable, the result has to be saved in a new variable

// Map: transforms emitted observables based on a provided projection function
// map(observable => function)

of(1,2,3,4,5).pipe(
    map(val => val * 10)
).subscribe(console.log);

// this outputs 10,20,30,40,50


// Pluck: takes the name of a observable field as input, and returns only this value of the observable
// pluck(field name(s))

const keyUp$ = fromEvent(document, 'keyup'); // registers every time a key is clicked
const keycode$ = keyUp$.pipe(
    map(key => key.code)
);

keycode$.subscribe(console.log); // logs only the code of the key, and excludes other information

// the equivalent code using pluck
const keycodepluck$ = keyUp$.pipe(
    pluck('code')
);

keycodepluck$.subscribe(console.log);

// can also be used for neste properties
pluck('target', 'nodename') // pluck(parent, child)



// mapTo: maps to a specific value whenever an observable is emitted
// mapTo(emitt value)

const pressed$ = keyUp$.pipe(
    mapTo('Key pressed') //this value is provided no matter the original value of the observable
);

pressed$.subscribe(console.log);


// filter: only emitts interesting values based on a provided function
// filter(observable => function)

of(1,2,3,4,5).pipe(
    filter(number => number > 2)
).subscribe(consolg.log);
// value smaller than 2 will be ignored


// reduce: adds observable values from the source together and emits accumulated value
// reduce((accumulated value, current value) => accumulated value + current value, 0)

const numbers = [1,2,3,4,5];

from(numbers).pipe(
    reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
    }, 0)
).subscribe(console.log) //this returns 15


// scan: applies a reduce function on every new emitted value and emits after every value
// scan((accumulated value, current value) => accumulated value + current value, 0)

const numbers = [1,2,3,4,5];

from(numbers).pipe(
    scan((accumulator, currentValue) => {
        return accumulator + currentValue;
    }, 0)
).subscribe(console.log)
//this retruns a new total after every emitted value