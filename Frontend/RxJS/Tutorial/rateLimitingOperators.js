
// rate limiting operators

import { debounceTime, throttleTime, sample, sampleTime, auditTime, startWith } from "rxjs/operators";
import { interval } from "rxjs";
import { FindValueSubscriber } from "rxjs/internal/operators/find";


// debounceTime: emits a value from source after a specified time has passed
// debounceTime(time to pass)
// one value is registered from source , a timer is started, if the specified time passes before
// the next value is registered this values is emitted

const click$ = fromEvent(document, 'click');
click$.pipe(
    debounceTime(1000)
).subscribe(console.log)
// emits click information if there is at least a 1sec pause after the click


// throttleTime: lets a value from the source pass, then ignores all value until the set time has
// passed before letting a new value pass
// throttleTime(timer)

const click$ = fromEvent(document, 'click');
click$.pipe(
    throttleTime(1000)
).subscribe(console.log)
// emits one click, pauses 1 second, emits the next click



// sampleTime: emits a value at the end of every interval. differs from throttleTime because the interval runs
// continiously and is not triggered by an emited value. if no new value is emited since last interval, not value
// is emited by sampleTime
// sampleTime(interval)

const click$ = fromEvent(document, 'click');

click$.pipe(
    sampleTime(4000),
    map(({clientX, clientY}) => ({clientX, clientY}))
).subscribe(console.log)
// After every 4 seconds, emit the lates x and y value, if any


// sample: samples the source observable based on another observable. emits the latest source input when the notifier
// observable emits a value
// sample(notifier$)

const click$ = fromEvent(document, 'click');
const timer$ = interval(1000);

timer$.pipe(
    sample(click$)
).subscribe(console.log)
// emits the latest value of timer$ after a 'click' event has occured

// auditTime: triggered by a source value, after the set interval has passed the last source value is emitted
// auditTime(interval)
// same as throttleTime, except a value is emitted at the end of the set interval instead of at the start. the last
// value is emitted instead of the first
const click$ = fromEvent(document, 'click');

click$.pipe(
    auditTime(4000),
    map(({clientX, clientY}) => ({clientX, clientY}))
).subscribe(console.log)
// a click activates an interval of 4 seconds, the last registered click is emitted when this interval is finished
// if there is no click$, not value is emitted