
// allow to ignore some values based on set criteria

import { take, first, takeWhile, takeUntil, distinctUntilChanged, distinctUntilKeyChanged } from 'rxjs/operators';
import { of, interval } from 'rxjs';

// take: takes a set amount of values
// take(number of values to use)

const numbers$ = of(1,2,3,4,5);
numbers$.pipe(
    take(3)
).subscribe(val => console.log(val)) //only logs 1, 2, 3



// first: only emits the first value that fulfills a condition
// first(condition)

const numbers$ = of(1,2,3,4,5);
numbers$.pipe(
    first(number => number > 3)
).subscribe(val => console.log(val)); //only logs 4



// takeWhile: emits inputs as long as the condition is meet
// takeWhile(condition, including value that terminates the observable? (true, false, false default))

const click$ = fromEvent(document, 'click');
click$$.pipe(
    map(event => ({
        x: event.clientX,
        y: event.clientY
    })),
    takeWhile({y} => y <= 200, true) // also include first value where y <= 200
).subscribe(console.log)

// this example starts at 5 and counts down one every second
const counter$ = interval(1000);
counter$.pipe(
    mapTo(-1),
    scan((accumulator, current) => {
        return accumulator + current;
    }, 5),
    tap(console.log),
    filter(value => value >= 0) // takeWhile(value => value >= 0)
    .subscribe(value => countdown.innerHtml = value)
)
// NOTE: when using filter the visual change in the html stops after reaching 0, however the countdown continues in the system
// while takeWhile terminates the observable so that no more values are emitted after -1




// takeUntil: emits values from the source until an observable from another source, notifier, emits a value
// takeUntil(notifier observable)

const counter$ = interval(1000);
const click$ = fromEvent(document, 'click');
counter$.pipe(
    takeUntil(click$)
).subscribe(console.log)
// prints the counter every second until the document is clicked



// distinctUntilChanged: emits values if they are distinct, based on the previous value
// distinctUntilChanged()

const numbers$ = of(1,1,2,3,3,3,4,4,5);
const numbers2$ = of(1,'1',2,2,3,3,4,5,2) // prints 1,1,2,3,4,5,2
numbers$.pipe(
    distinctUntilChanged()
).subscribe(console.log) // prints 1,2,3,4,5

// distinctUntilChanged can also accept a method
const user = [
    {name: 'Brian', loggedIn: false},
    {name: 'Brian', loggedIn: true},
]
const state$ = from(user);
const name$ = state$.pipe(
    distinctUntilChanged((prev, curr) => {
        return prev.name === curr.name;
    }) // the name field is now being compared, instead of the while object having to be unique
)

// a shortcut to this is using distinctUntilKeyChanged
// distinctUntilKeyChanged: takes a key from an Object, and emits value if the key is distinct based on previous values 
// distinctUntilKeyChanged(key name)

const name$ = state$.pipe(
    distinctUntilKeyChanged('name') // the name field is now being compared, instead of the while object having to be unique
)