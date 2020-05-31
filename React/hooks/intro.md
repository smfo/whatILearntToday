
# Hooks

Hooks let us use states and other React features withoug writing a class.\
The let us hook into React state and lifecycles features from function components. 
They don't work inside classes, and you don't need then cause they support React by default.

React provides some built inn hooks, it is also possible to create your own.

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

The useState() is a Hook that returns a getter, that returns the current state value,
 and a setter, a function that lets you update the state value.\
We can set multiple states in the same component.

```javascript
function MultipleStates(){
    const [food, setFood] = useState('nanabanzuke');
    const [dinnerGuests, setDinnerGuests] = useState(4);
    const [todos, setTodos] = useState([{text: 'Buy ingredients'}]);
}
```

NB: instead of merging states like this.setState, the setter created by the state hook
replaces the previous state value when it is called.