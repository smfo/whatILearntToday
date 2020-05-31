
# How to write a program using separated files for different components

Make the component available to other components using either

```javascript
function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}
export default Square;
```

or

```javascript
export default function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}
```

import this component to other project using 

```javascript
import Square from './square.js'
```
