
# Tips and tricks

## Finalize

The `complete` callback is only run in cases where the stream ends naturally or by a value
you have provided, like take(). It will not run in cases where we unsubscribe from the observable.\
To run code in these scenarios, use finalize.

Finalized will also be called in cases where "complete" is called.

```javascript
const sub = interval(1000).pipe(
    finalize(() => {
        counter.innerHTML = 'Stopped!';
    })
).subscribe(val => {
    counter.innerHTML = val;
});

setTimeout(() => {
    sub.unsubscribe();
}, 3000);
```

## Access state from secondary stream

```javascript
// Goal: to access the testId from store$ in answerChange$

const saveAnswer = (answer, testId) => {
    return of({
        answer,
        // this is "dirty" and will only work with BehaviorSubjects
        // testId: store$.value.testId
        testId
    }).pipe(delay(200))
}

const answerChange$ = fromEvent(radioButtins, 'click');

const store$ = new BehaviorSubject({
    testId: 'abc123',
    complete: false,
    moreData: {}
});

answerChange$.pipe(
    withLatestFrom(store$.pipe(
        pluck('testId')
    )),
    //concatMap now recives value from the main and secondary stream
    concatMap(([event, testId]) => {
        return saveAnswer(event.target.value)
    })
).subscribe(console.log);
```

### withLatestFrom()
WithLatestFrom takes a secondary stream to subscribe to.\
With each value of the primary stream, the last value of the secondary stream will also be emited in an array.

Other ways to achive the example above
```javascript
answerChange$.pipe(
    withLatestFrom(store$),
    concatMap(([event, store$]) => {
        return saveAnswer(event.target.value, store$.value.testId)
    })
).subscribe(console.log);

answerChange$.pipe(
    withLatestFrom(store$),
    concatMap(([event, { testId }]) => {
        return saveAnswer(event.target.value, testId)
    })
).subscribe(console.log);
```

NB: will not emit any values if the secondary stream has not emitted any previous values to the inner 
subscription by the time the main subscriptionis run.\
F.ex Subject will only provide emitted values after a subscription is made. So if no values are emitted 
after subscription any values from the secondary stream will be ignored as the main stream is not aware of them.

BahaviorSubjects works as it imidiatly emits a value on subscription.