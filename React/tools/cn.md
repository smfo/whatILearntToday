
#ngClass in React

The javascript way of changing css classes in React depending on conditions

```javascript
export default function Square(props) {

const classes = ["square", props.bold ? "winner" : ""].join(" ");
    return (
        <button className={classes} onClick={props.onClick}>
            {props.value}
        </button>
    );
}
```

Classnames is a dependency library that provides conditional class selection in React
install: `npm install classnames --save`
in js: `import cn from 'classnames'`

cn takes n arguments defined as css classes an returns a string of the joined arguments.
general classes: `className={cn("btn", "h-100")}`
conditional classes: `className={cn({"btn-green": this.state.selected})}`

conditional classes has to be defined as objects where the key is  the class name as a string,
and the value returns a boolean, the condition.

The example below combine general classes and conditional classes,

```javascript
import cn from 'classnames';

export default function Square(props) {

    return (
        <button className={cn("square", {"winner":props.bold})} onClick={props.onClick}>
            {props.value}
        </button>
    );
}
```