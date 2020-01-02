
// A subject is like an observable. it can be subscribed to and has the methods next, error and complete.
// the main reason for using subjects if to multicast, while an observable by default is unicast. 
// maning that each subscribed observer owns an independent execution of the observable. in other words,
// the subscribers does not necessarily revice the same values of the observable


// the two subscribers receive different value because the observable does not return a static value,
// and because observables are unicast
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



// this will be pretty annoying if you expect each subscriber to receive the same values.
// Multicasting means that one observable execution if shared among multiple subscribers

// Subjects are like EventEmitters, they maintain a registry of many listeners. When calling subscribe on a
// Subject, a new execution that delivers data is not created. The given observer is simply registered
// in the list of observers


// you do not have to do anything special to achieve the multicast behavior
const subject = new Rx.Subject();

// subscriber 1
subject.subscribe((data) => {
    console.log(data); // 0.24957144215097515 (random number)
});

// subscriber 2
subject.subscribe((data) => {
    console.log(data); // 0.24957144215097515 (random number)
});

subject.next(Math.random());

// whereas observables are solely data producers, subjects can also be used as data consumers

// this example uses the subject as a consumer, and at the same time displays how to convert observable into subjects
const observable = Rx.Observable.create((observer) => {
    observer.next(Math.random());
});

const subject = new Rx.Subject();

// subscriber 1
subject.subscribe((data) => {
    console.log(data); // 0.24957144215097515 (random number)
});

// subscriber 2
subject.subscribe((data) => {
    console.log(data); // 0.24957144215097515 (random number)
});

observable.subscribe(subject);


// rxjs offers multiple types of subjects:
// BehaviorSubjects, ReplySubjects and AsyncSubjects



// BehaviorSubjects
// the characteristics of this subject is that is stores the current value, meaning that you always get the last emitted value
// from the BehaviorSubject
// this can either be done by acessing .value or by subscribing. By subscribing, the BehaviorSubject will directly emit the
// current value to the subscriber, even if the subscrition happens long after the value is stored



const subject = new Rx.BehaviorSubject();

// subscriber 1
subject.subscribe((data) => {
    console.log('Subscriber A:', data);
});

// print 1
subject.next(Math.random());
// print 2
subject.next(Math.random());

// subscriber 2
subject.subscribe((data) => {
    console.log('Subscriber B:', data);
});

// print 3
subject.next(Math.random());

console.log(subject.value)

// output
// Subscriber A: 0.24957144215097515 - print 1
// Subscriber A: 0.8751123892486292 - print 2
// Subscriber B: 0.8751123892486292 - subscriber 2
// Subscriber A: 0.1901322109907977 - print 3
// Subscriber B: 0.1901322109907977 - print 3
// 0.1901322109907977

// BehaviorSubjects can also be created with a start value
const subject = new Rx.BehaviorSubject(Math.random());

// subscriber 1
subject.subscribe((data) => {
    console.log('Subscriber A:', data);
});

// output
// Subscriber A: 0.24957144215097515


// ReplaySubject
// this subjecttype can also send "old" values to new subscribers, like BehaviorSubjects. However, while the 
// BehavoirSubject only keeps one value, the ReplaySubject can record a part of the observable execution and store 
// multiple old value and "replay" them to new subscribers
// On creation it is possible to specify how many values are desierable to store and how long they should be stored for

// store 2 old values
const subject = new Rx.ReplaySubject(2);

// subscriber 1
subject.subscribe((data) => {
    console.log('Subscriber A:', data);
});

// print 1
subject.next(Math.random())
// print 2
subject.next(Math.random())
// print 3
subject.next(Math.random())

// subscriber 2
subject.subscribe((data) => {
    console.log('Subscriber B:', data);
});

// print 4
subject.next(Math.random());

// Subscriber A: 0.3541746356538569 - print 1
// Subscriber A: 0.12137498878080955 - print 2
// Subscriber A: 0.531935186034298 - print 3
// Subscriber B: 0.12137498878080955 - subscriber 2
// Subscriber B: 0.531935186034298 - subscriber 2
// Subscriber A: 0.6664809293975393 - print 3
// Subscriber B: 0.6664809293975393 - print 3

// a time limit can be specified like this
const subject = new Rx.ReplaySubject(2, 100);




// AsyncSubject
// this subject only sends the last value of the observable execution to its subscribers, after the 
// execution is completed


// all calls to the subject before subject.complete() are ignored
const subject = new Rx.AsyncSubject();

// subscriber 1
subject.subscribe((data) => {
    console.log('Subscriber A:', data);
});

subject.next(Math.random())
subject.next(Math.random())
subject.next(Math.random())

// subscriber 2
subject.subscribe((data) => {
    console.log('Subscriber B:', data);
});

subject.next(Math.random());
subject.complete();

// Subscriber A: 0.4447275989704571 - subject.complete()
// Subscriber B: 0.4447275989704571 - subject.complete()