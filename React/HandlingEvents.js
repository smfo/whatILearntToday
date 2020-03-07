
// React events are named using camelCase
// with JSX, the function is passed as the event handler, rather than a string

// HTML
<button onclick="activateLasers()">
  Activate Lasers
</button>

// React
<button onClick={activateLasers}> //the function is passed like a variable, not a string
  Activate Lasers
</button>

// Passing and argument, id, to an event handler
// These are equivalent, one in arroc function and one function.prototype.bind
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>

// as well as the argument itself, the React event (e/this) also has to be passed