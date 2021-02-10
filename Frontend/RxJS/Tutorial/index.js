import { Observable } from 'rxjs';

// Example of how an observer cam be implemented

const observer = {
    // any of these callbacks can be skipped and handeled somewhere else
    next: value => console.log('next', value),
    error: value => console.log('error', error),
    complete: () => console.log('complete')
}

const observable = new Observable(subscriber => {
    // what will be pushed to the subscribers
    subscriber.next('Hello');
    subscriber.next('World');
    sybscriber.complete(); //the complete logic will only! be ran if this is called, not on unsubscribe
    // no more values will be delivered to the observers after this point

    // this will be called when the observable is stopped
    return() => {
        console.log('observation completed');
        // do something
    }
})

const subscription = observable.subscribe(observer);
const subTwo = observable.subscribe(observer);

subscription.add(subTwo);
// alternativly subscription.add(observable.subscribe(observer));

setTimeout(() => {
    // because all the subscriptions are added to subscription, they all unsubscribe at the same time
    subscription.unsubscribe(); //this fiers the cleanup method but NOT the complete callback!
})


// alternative way of providing callbacks
// observable.subscribe(
//     value => console.log('next', value),
//     value => console.log('error', error),
//     () => console.log('complete')
// )