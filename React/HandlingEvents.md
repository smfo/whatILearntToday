
# Handling events

 React events are named using camelCase.\
 With JSX, the function is passed as the event handler, rather than a string

HTML
```html
<button onclick="activateLasers()">
  Activate Lasers
</button>
```

React
```javascript
<button onClick={activateLasers}> //the function is passed like a variable, not a string
  Activate Lasers
</button>
```

Passing and argument, id, to an event handler
These are equivalent, one in arroc function and one function.prototype.bind
```javascript
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```
As well as the argument itself, the React event (e/this) also has to be passed