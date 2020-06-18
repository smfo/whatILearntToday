
# Hooks

Hooks let us use states and other React features withoug writing a class.\
They let us hook into React state and lifecycles features from function components. 
They don't work inside classes, and you don't need them there cause they support React by default.

React provides some built in hooks, it is also possible to create your own.

```javascript
import React, { useState } from 'react';

function Example(){
    // declasing a new state variable in the function with initial value 0
    const [count, setCount] = useState(0);

    return (
        <div>
            <p> You clicked {count} times </p>
            <button onClick={() => setCount(count + 1)}>
                Click me
            </button>
        </div>
    );
}
```

#### Usage
Can only be called by functional components.
Can only be called by the top level. This ensures that they are call in the same order every
time the element renders. Do not call inside loops, conditions or nested functions.

The ESLint plugin enforces that these two rules are followed.
`npm install eslist-plugin-react-hooks`