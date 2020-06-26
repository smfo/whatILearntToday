
# Testing observables with subscribe and assert

## vs marble testing
Marble testing\
+ Expressive tests using marbles
+ Easily create and visualize streams
+ test accuracy of both values and timing
- fair amount of setup
- require knowledge of the RxJs testing helpers
- require knowledge of marble syntax

Subscribe and assert testing\
+ less setup required
+ use typical testing APIs
+ use typical testing patterns
- require managment of async test completion
- extra boilerplate for assertions
- hard to accuratly test timing

```javascript
describe('subscribe & assert testing in RxJS', () => {
   
   // basic test
    it('should compare each emitted value', () => {
        const source¤ = of(1,2,3);
        const final$ = source$.pipe(
            map(val => val*10)
        );

        const expected = [10, 20, 30];
        const index = 0;

// subscribe to the observable that is to be tested and use assert functions on it
//as each value is tested as it is submitted, we need to increase index to compare to the correct value in "expected"
        final$.subscribe(val => {
            expect(val).toEqual(expected[index]);
            index++;
        })
    });

//toArray test
    it('should compare emitted values on completion with toArray', () => {
        const source$ = of(1,2,3);
        const final$ = source$.pipe(
            map(val => val*10),
            toArray()
            //collects all values in an array and emits this on completion
            //this needs to be the last thing that happens in the pipe! as it 
            //collects the values as they are in the given location
        );

        const expected = [10, 20, 30];

        final$.subscribe(val => {
            expect(val).toEqual(expected);
        });
    });

    //asynchronous operators with callback
    //done signalises when the test is complete
    // this sort of test is better done with marble testing as there is not way to test the delays
    it('should let you test async operations with done callback', done => {
        const source$ = of('Ready', 'Set', 'Go!').pipe(
            mergeMap((message, index) => of(message).pipe(
                delay(index * 1000)
            ))
        );

        const expected = ['Ready', 'Set', 'Go!'];
        let index = 0;

        source$.subscribe(val => {
            expect(val).toEqual(expected[index]);
            index++;
        }, null, done);
        // arg 2: error handeling, arg 3: action on completion
    });


    it('should let you test errors and error messages', () => {
        const source$ = of({ first: 'Brian', last: 'Smith' }, null).pipe(
            map(o => `${o.first} ${o.last}`),
            catchError(() => {
                throw 'Invalid response!';
            })
        );

        const expected = ['Brian Smith', 'Invalid response'];
        let actual = [];
        let index = 0;

        source$.subscribe({
            //this code will work, but only tests the treatment of the observables seperatly
            //removing either next or error will not make the test fail

            // next: value => {
            //     expect(value).toEqual(expected[index]);
            //     index++;
            // },
            // error: error => {
            //     expect(error).toEqual(expected[index]);
            // }

            // for this approach, removing next or error will fail the test
            // this sort of test is better done with marble testing
            next: value => {
                actual.push(value);
                index++;
            },
            error: error => {
                actual.push(error);
                expected(actual).toEqual(expected);
            }
        })
    });


});

```