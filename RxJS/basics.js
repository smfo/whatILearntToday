
// What is rxjs
// library based on observable manipulation
// stream of data that will be delivered over time
// observables are lazy and only execute after something has subscribed to it

npm install --save rxjs


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