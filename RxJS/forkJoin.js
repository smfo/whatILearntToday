
//forkJoin
// forkJoin accepts an array of observables or a dictionary object of observableinput and returns
// an observable that emits an array of values (in the excact same order as the passed array), or
// a dictionary of values (in the same shape as the passed dictionary)

forkJoin(this.get(url), this.get(underenhetUrl)).pipe(
    map(res => {
        return res[0] || res[1];
        //res contains the observable from both input observables, 
        //forkJoin does not pass through the entire pipe with one observable before doing the same with the next
    }),
    tap(company => console.log('company', company)),
    map(company => {
        return new CompanyInfo(company);
    })
);

// the operator will wait for all the passed observables to complete and befor eemitting
// If an array of n observables is passed, the resulting array will also have n values
// if a dictionary is passed, the resulting object will have the same keys as the original dictionary
// meaning that forkJoin will not anit more than once, and then complete

// because the operator contains as many values as passed to it, the operator will complete
// imidiatly if one observable does not emit any value. in this case, forkJoin will not
// emit anything either. if one of the observables never complete, forkJoin will never complete
// either. if any of the observables throws an error, forkJoin will also throw an error and all the
// other observables will be unsibscribed
// -> forkJoin will only emit a value if all the observables passed as arguments have emitted
// something at least once, and completed

// forkJoin complets in the example above because get() returns something instead of just throwing an error

public get() {
    return this.http.get(url, { headers: headers }).pipe(
        catchError(error => {
            return of(undefined);
            // throw(error)  would not let forkJoin complete and would cause a source.lift error
        })
    );
}