
# Scheduler

Synchronous (line by line)
asynchronysly (not in file order, callbacks). avoids blocking the program while waiting for resources to reply, microtask queue


Says something about when the tasks should be run. 
input: work, delay?, state?

When used with operators, schedulers can sometimes be added as an input to the creation operator, or it can be 
added to the operation pipe.
```javascript
const observer = {
    next: val => console.log('next', val),
    error: err => console.log('error', err),
    complete: () => console.log('complete')
};

of(1,2,3, asynchAcheduler).subscribe(observer);
// or
of(1,2,3).pipe(observeOn(asynchScheduler, 3000)).subscribe(observer)

of(4,5,6).subscribe(observer);
console.log('sync');
```
Output:
* next 4
* next 5
* next 6
* sync
* next 1
* next 2
* next 3
* complete

## AsyncScheduler
Lets you schedule tasks to be executed asynchronosly, generally with a delay.

```javascript
asyncScheduler.schedule(
    console.log, //work
    2000, //delay
    'Hello world' //state
);

console.log('sync');
```
Output:
* sync
* Hello world (after a 2s delay)

## AsapScheduler
Executes tasks asynchronosly, but as fast as possible. Executes before following async operations.

```javascript
asyncScheduler.schedule(
    () => { console.log('async')}
);

asapScheduler.schedule(
    () => {
        console.log('asap')
    }
);

console.log('sync');
```
Output:
* sync
* asap
* async