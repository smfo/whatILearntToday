
# Destructuring arguments

Instead of writing,

```javascript
const PI = Math.PI;
const E = Math.E;
const SQRT2 = Math.SQRT2;
```

destructuring lets us write
```javascript
const {PI, E, SQRT2} = Math;
```
This takes the properties out of the parent object, and they can be used without the 'Math.'


### Function arguments

```javascript
const circle = {
    label: 'circleX',
    radius: 2,
}

//the precision property is default set to 2
const circleArea = ({radius}, {precision = 2} = {}) =>
 (PI * radius * radius).toFixed(precision);


circleArea(circle, { precision: 5 });
```
If the argument passed to a function is an object it is possible to use
the destructuring syntax within the function parenthisies to avoid having to refer
to the whole object every time one wants to use these properties.