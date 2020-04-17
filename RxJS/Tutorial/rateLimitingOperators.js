
rate limiting operators

import { debounceTime } from "rxjs/operators";


// debounceTime: emits a value from source after a specified time has
// debounceTime(time to pass)
// one value is registered from source , a timer is started, if the specified time passes before 
// the next value is registered this values is emitted

const click$ = fromEvent(document, 'click');
click$.pipe(
    debounceTime(1000)
).subscribe(console.log)
// emits click information if there is at least a 1sec pause after the click