
# Components and props

Components make it possible to split the UI into independent, reusable pieces.
They can take inputs, props, and returns React elements.

```javascript
class Welcome extends React.Component {
    render() {
      return <h1>Hello, {this.props.name}</h1>;
    }
}
```

Props can be passed to a component like so
```javascript
class Square extends React.Component {
    render() {
      return (
        <button className="square">
          {this.props.value}
        </button>
      );
    }
  }
  
class Board extends React.Component {
    renderSquare(i) {
      return <Square value={i} />;  //uses the component Square and passes a prop 'value'
}
```

#### Naming of props and access:
When refering to a property in the child component, props is always included, 
followed by the property name, `this.props."proterty name"`

NO REACT COMPONENTS MUST CHANGE THE VALUE OF THEIR PROPS\
Instead states are used (in some cases).

Props can be nested or inserted seperatly
```javascript
function Text(props){
    return(
    <div className="Comment-text">{props.text}
      <div className="Comment-date">{formatDate(props.date)}</div>
    </div>
    )
  }
  
<Text text={props.text} date={props.date}/>  //inserting two props in the same component
```
```javascript
function Text(props){
    return(
    <div className="Comment-text">{props.values.text}
        <div className="Comment-date">{formatDate(props.values.date)}</div>
    </div>
    )
}
      
<Text values={props}/>  //"nesting" props
```

### Immutability
Props should not be changed directly, they are immutable. Instead, create a copy of
the prop if the value needs to be mutated.

```javascript
var player = {score: 1, name: 'Jeff'};

var newPlayer = Object.assign({}, player, {score: 2});
```
Now player is unchanged, but newPlayer is {score: 2, name: 'Jeff'}

Advantages of components
 - complex features become simpler (time travel etc)
 - detecting changes
 - determining when to re-render: helps building pure react components
Being able to detect changes helps determining when to re-render a component