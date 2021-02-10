
# Observables
Lazy collections, if you don't subscribe, nothing will happen.\
They can have multiple values over time, a new observable will be recived once in a while. The sender decides when you get it, all the subscriber has to do is wait.

## Observables vs promisses
observabels can be canceled\
promisses can only return one value

## pull and push 
When pulling, the data consumer decides when to get data from the data producer. The producer is unaware of when data will be delivered to the consumer.\
Pushing works the other way. The data producer decides then the consumer gets the data
observables push 

there are three functions available to send data to the subscribers
"next": sends a value to the subscribers
"error": sends a javascript error or exception
"complete": does not send any value

next is the most common call, and actually delivers a value to the subscribers. There can be infinite calls to observer.next(), but after error() or complete() is called the execution stops and no more data will be delivered to the subscribers.

to stop the execution of observables, observer.unsubscribe() is called for subscribers that don't need data anymore. This is done to prevent waste of memory and computing power, as each execution is run for every subscriber.

## Hot vs cold
When the data is produced by the observable itself, it is a cold observable. 
When the data is produced outside the observable, it is a hot observable.

Hot observable are able to share data between multiple observables, so called multicasting.\
Cold observables only create data if there is at least one subscriber, while the data for hot observables will be created regardless, as this value is created outside the observable. If there is no subscriber when the data is produced, the data is simply lost.

This example has a cold observable, as the observable value is generated inside the observable itself.
Since the observable does a new execution every time some object subscribes to `instanceof`, the data the subscribers receive is different.

```js
const observable = Rx.Observable.create((observer) => {
    observer.next(Math.random());
});

// subscription 1
observable.subscribe((data) => {
  console.log(data); // 0.24957144215097515 (random number)
});

// subscription 2
observable.subscribe((data) => {
   console.log(data); // 0.004617340049055896 (random number)
});
```

This is an alternative approach, where the value is generated outside the observable, the observable is hot. Here both subscribers recive the same value from the observable as the observable value is not regenerated in between subscriptions. There are still two executions, however the observable value does not change.

```js
const random = Math.random()

const observable = Rx.Observable.create((observer) => {
    observer.next(random);
});

// subscription 1
observable.subscribe((data) => {
  console.log(data); // 0.11208711666917925 (random number)
});

// subscription 2
observable.subscribe((data) => {
   console.log(data); // 0.11208711666917925 (random number)
});
```