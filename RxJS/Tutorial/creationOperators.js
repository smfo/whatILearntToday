import { Observable, fromEvent, of, range, from, interval, timer } from 'rxjs';

// creates an observable pipeline by wrapping other data

// fromEvent: creates observables from DOM events
// fromEvent(event target, event)

const observer = {
    next: val => console.log('next', val),
    error: err => console.log('error', err),
    complete: () => console.log('complete')
}

//this subscribes on clicks done in a document (component/file)
const sourceFromEvent$ = fromEvent(document, 'click');
sourceFromEvent$.subscribe(observer);


// of: takes an infinit number of values and emits them syncronosly before completing
// the values are not changed in any way, so if one of the elements is an Array, an array will be emited to the observers
// of(values to emit)

const sourceOf$ = of(1,2,3,4,5);
sourceOf$.subscribe(observer);

// range: is a specialised version of "of" and emits a range of values
// range(starting value, end value)

//this gives the same result as the "of" example above
const sourceRange$ = range(1, 5);
sourceRange$.subscribe(observer);

// from: smarter version of "of", emits the values in sequense 
// and emits items in a way that makes sense for that value type
// from(value to emit)

// of([1,2,3,4,5]) emits one time 
// from([1,2,3,4,5]) emits five times
// some times its goo smart for its own good 
// from("Hello") will also emit 5 times, one time per character

const sourceFrom$ = from([1,2,3], 4, 5);
sourceFrom$.subscribe(observer);



// interval: emits numbers in sequence at a specified interval
// interval(duration)

// emits the next Number, starting at 0,every second after subscription
const timerInterval$ = interval(1000);
timerInterval$.subscribe(console.log);

// timer: specialised version or interval, the first interval can be different from the rest 
// timer(first interval, following intervals)

const timerTimer$ = timer(0, 1000); //emits the first value straight away, then every 1 second
const timerTimerFirst$ = timer(2000); //emits the first value after 2 seconds, then stops
timerTimer$.subscribe(console.log);