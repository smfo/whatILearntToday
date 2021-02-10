
# Marble testing

-: one frame of virtual time
[a-z0-9]: emitted value ex. -a--b-
#: errrs, ex. --a-b--#
(): synchronous groupings, ex. -(abc)--
|: completion og an observable, ex (abc|)

Short example of a test
```javascript
const source$ = cold('-a-b-c-', {a: 1, b: 2, c: 3});
const final$ = source$.pipe(map(value => value*10));
expectObservable(final$).ToBe('-a-b-c-', {a: 10, b: 20, c: 30 });
```

### Cold observable:
Cold observables subscription will start when the test begins.

### Hot observable:
Streams that are already running when the test begins.

Examples are written with jasmine
```javascript
import { TestScheduler } from 'rxjs/testing';

describe('Marble testing in RxJs', () => {
    let testScheduler;

    beforeEach(() => {
        testScheduler = new TestScheduler((acutal, expected) => {
            expect(actual).toEqual(expected);
        });
    });

//basic test
    it('should convert ASCII diagrams into observables', () => {
        testScheduler.run(helpers => {
            const { cold, expectObservable } = helpers;
            const source$ = cold('--a-b---c');
            const expected = '--a-b---c';

            expectObservable(source$).toBe(expected);
        });
    });

// replace the characters in the marble testdiagram with variables
    it('should allow configuration of emitted values', () => {
        testScheduler.run(helpers => {
            const { cold, expectObservable } = helpers;
            const source$ = cold('--a-b---c', {a: 1, b: 2, c: 3});
            const final$ = source$.pipe(map(val => val*10))
            const expected = ('--a-b---c', {a: 10, b: 20, c: 30 });

            expectObservable(final$).toBe(expected);
        });
    });

    //check subscriptions
    // ^ add subscription
    // ! unsubscribe
    // expect subscription to unsubscribe imidiatly after it is finished and the next subscription to be added imidiatly after the previous has unsubscribed.
    it('should let you identify subscription points', () => {
        testScheduler.run(helpers => {
            const { cold, expectObservable, expectSubscriptions } = helpers;
            const source$ = cold('-a---b-|');
            const sourceTwo$ = cold('-c---d-|');
            const final$ = concat(source$, sourceTwo$);

            const expected = '-a---b--c---d-|';
            const sourceOneExpectedSub = '^------!'
            const sourceTwoExpectedSub = '-------^------!'

            expectObservable(finals$).toBe(expected);
        });
    });

//basic hot test
// without a subscription point the behaviour of the hot observable will be the same as a cold one
    it('should let you test hot observables', () => {
        testScheduler.run(helpers => {
            const { cold, hot, expectObservable } = helpers;
            const source$ = hot('--a-b-^-c'); //subscribe after emitting a and b
            const final$ = source$.pipe(take(1));
            const expected = '--(c|)'; // only expect the values that are emitted after subscriptions

            expectObservable(source$).toBe(expected);
        });
    });

    // synchronous operations
    it('should let you test synchronous operations', () => {
        testScheduler.run(helpers => {
            const { cold, expectObservable } = helpers;
            const source$ = from([1,2,3,4,5]);
            const expected = '(abcde|)';     
            // model that the observable emit all the values at the same time, synchronously
            // in this example the pipe is also in the parenthesies because the observable completes imidiatly after the final values is emitted

            expectObservable(source$).toBe(expected, { a: 1, b: 2, c: 3, d: 4, e: 5});
        });
    });

    // asynchronous operations and delays
    it('should let you test synchronous operations', () => {
        testScheduler.run(helpers => {
            const { expectObservable } = helpers;
            const source$ = from([1,2,3,4,5]);
            const final$ = source$.pipe(delay(200));
            const expected = '200ms (abcde|)';   
            //delays can be modeled by adding a virtual timeframe, time value + ms/s  

            expectObservable(final$).toBe(expected, { a: 1, b: 2, c: 3, d: 4, e: 5});
        });
    });

    //error handeling
    it('should handle errors', () => {
        testScheduler.run(helpers => {
            const { expectObservable } = helpers;
            const source$ = of({firstName: 'Brian', lastName: 'Smith'}, null).pipe(
                map(o => `${o.firstName} ${o.lastName}`),
                catchError(() => {
                    throw 'Invalid user!'
                })
            );
            const expected = '(a#)';   

            expectObservable(source$).toBe(expected, {a: 'Brian Smith'}, 'Invalid user!')
            // The error handeling needs to be passed as the third argument
        });
    });

    //force completion
    // problems: if the stream runs indefinetly the expected value will not match what we recive from the stream, the program will also crach while running
    // solution, force the stream to stop after a set amount of time
    // NB: the expected solution must match exactly the recived values emited before the forced subscription
    it('should let you test snapshot of streams that do not complete', () => {
        testScheduler.run(helpers => {
            const { expectObservable } = helpers;
            const source$ = interval(1000).pipe(
                map(val => `${val + 1}sec`)
            );
            const expected = '1s a 999ms b 999ms c';
            const unsubscribe = '4s !'; // forcing to unsubscribe

            //passing the unsubscribe method as a second argument
            expectObservable(source$, unsubscribe).toBe(expected, {
                a: '1sec',
                b: '2sec',
                c: '3sec'
            });
        });
    });

})