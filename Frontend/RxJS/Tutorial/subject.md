
# Subject

A subject in an observer and an observable. It has the next, error, complete,
pipe and subscribe methods.\
It is multicast, meaning multiple subscribers/observers can share one subject and will recive
the same values from this. Combared to an observable, that can only be connected
to one subscriber/observer.\
Because the subject itself is an observer as well as an observable, the subject can subscribe
to an observable and emit the value reviced from this to multiple observers.

```javascript
const observer = {
    next: val => console.log('next', val),
    error: err => console.log('error', err),
    complete: () => console.log('complete')
};

const subject = new Subject();

const subscription = subject.subscribe(observer);

subject.next('Hello');
//output: next Hello

const subscriptionTwo = subject.subscribe(observer);

subject.next('World');
//outout: next World, next World
```

### Share and multicast
Some times it is decierable to transform a unicast obsevable into a multicast observable.\
This can be done by taking a subject, subscribing to an observable and for the end observers to
subscribe to the subject.
```javascript
const observer = {
    next: val => console.log('next', val),
    error: err => console.log('error', err),
    complete: () => console.log('complete')
};

const subject = new Subject();
const interval$ = interval(2000).pipe(
    tap(i => console.log('new interval', i))
);

interval$subscribe(subject);

const subOne = subcjet.subscribe(observer);
const subTwo = subcjet.subscribe(observer);
```
This creates a lot of overhead.

What we can do instead is to make the observable into a multicast.
```javascript
const interval$ = interval(2000).pipe(
    tap(i => console.log('new interval', i))
);

const muticastInterval$ = interval$.pipe(
    multicast(() => new Subject())
)
//this is needed to connect the multicast to the original obserable
multicastedIntervals$.connect()

//subscribing to the multicast observable
const subOne = multicastInterval$.subscribe(observer);
const subTwo = multicastInterval$.subscribe(observer);

setTimeout(() => {
    sebOne.unsubscribe();
    subTwo.unsubscribe();
}, 3000)
```
In this example the multicast is submitting a subject. subOne and subTwo
subscribe to this, and then unsibscribe. The problem is that the multicast is stil
running in the background.

```javascript
const muticastInterval$ = interval$.pipe(
    multicast(() => new Subject()),
    refCount() //autonatically connects and unsubscribes
)

const subOne = multicastInterval$.subscribe(observer);
const subTwo = multicastInterval$.subscribe(observer);

setTimeout(() => {
    sebOne.unsubscribe();
    subTwo.unsubscribe();
}, 3000)
```
refCount() autonatically connects the multicast whene the observable has any observers,
and unsubscribes the multicast, not the subscribers, when there are no more subscribers.\
After the setTimeout, the multicast will no longer be running in the background, like it was before.

These lines of code can be swoped with the built in method share().
```javascript
const muticastInterval$ = interval$.pipe(
    share() // replaces multicast and refCount
)

const subOne = multicastInterval$.subscribe(observer);
const subTwo = multicastInterval$.subscribe(observer);

setTimeout(() => {
    sebOne.unsubscribe();
    subTwo.unsubscribe();
}, 3000)
```

### BehaviorSubject

A subject that provides the subscriber with the its current value when subscribing.\
To compare, new observers to subjects only recives a value when a new value is emitted.

```javascript
//BehavioralSubjects require an initial value
const subject = new BehaviorSubject('Hello');

const subOne = subject.subscribe(observer);
//logs next Hello

const subTwo = subject.subscribe(observer);
//logs next Hello

subject.next('World'):
//output: next World, next World

setTimeout(() => {
    subject.subscribe(observer), 3000
})
//logs next World
```

### ReplaySubject
Subjects that can emit all previous values to new subscribers.\
The number of previous values to emit to new subscribers can be specified. By default
all values are replayed.

```javascript
//replay the previous 2 values to new subscribers
const subject = new ReplaySubject(2);

subject.next('Hello');
subject.next('World');
subject.next('Goodbye');

subject.subscribe(observer);
//logs: next, World, next Goodbye
```

### shareReplay
Turns a unicast observable into a multicast observable, while also replaying previous values.
```javascript
const ajax = ajax('https://api.github.com/users/octocat');
const click$ = fromEvent(document, 'click');
const clickRequest$ = click$.pipe(
    mergeMatTo(ajax$),
    shareReplay(1) //defaults to replay all previous values
);

clickRequest$subscribe(observer);

setTimeout(() => {
    clickRequest$.subscribe(observer);
}, 5000);
```

### AsyncSubject
A subject that only emits the latest value to all subscribers once the stream is completed.

```javascript
const subject = new AsyncSubject();
subject.subscribe(observer);
subject.subscribe(observer);

subject.next('Hello');
subject.next('World');
subject.next('Goodbye');

subject.complete();
//output: next Goodbye, next Goodbye + Complete, Complete
```