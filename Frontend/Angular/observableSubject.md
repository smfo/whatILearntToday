# Observables, subjects and behaviorSubjects

## Subjects
Implements both the observer and the observable interface, meaning they can emit value and register subscribers. (Whereas observers are subscribers and observables are the interesting values).

```js
let subject = new Subject();

subject.subscribe(value => console.log('Received new subject value: '))

//emiting values to it's subscribers
subject.next(newValue);
```

HOWEVER: when subscribing to a Subject you won't be given the current value, you will have to wait until a new value is emitted.

## BehaviorSubjects
Acts like Subjects, but when subscribing the current value, or a default value, is returned to the subscriber.

```JS
let behaviourSubject = new BehaviorSubject(initialState);

behaviourSubject.next(updatedValue)
```

It is also possible to retriv the current value from the object at any time during the stream.

```JS
let currentValue = behaviorSubject.getValue();
```