
// pipe: stitches together functional operators to a chain. old syntax observable.filter().map().scan()
// however, every rcjs operator is a standalone function, not an observale's method, therefore pipe is needed

this.createUser(
    this.authConfig.waitUntilInitiated.pipe(
        filter(res => res.config),
        map(config => config.userInfoUrl),
        tap(config => console.log('config', config))
    )
);

// tap: when placed in a pipe tap can performe side effects on the observed data without 
// modifying the steam in any way. Acts similar to then()

//filter: filter the source observable and only emitts those that satisfy a specific predicate

//map: applies a gives project function to each value emitted by the source observable, and
// emits the resulting values as an observable