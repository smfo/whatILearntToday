

// Components make it possible to split the UI into independent, reusable pieces
// They can take inputs, props, and returns React elements

class Welcome extends React.Component {
    render() {
      return <h1>Hello, {this.props.name}</h1>;
    }
  }

// props can be passed to a component like so
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

// Naming of props and access:
this.props."proterty name"
// props is always included

// NO REACT COMPONENTS MUST CHANGE THE VALUE OF THEIR PROPS
// instead states are used (in some cases)

// props can be nested or inserted seperatly
function Text(props){
    return(
    <div className="Comment-text">{props.text}
      <div className="Comment-date">{formatDate(props.date)}</div>
    </div>
    )
  }
  
    <Text text={props.text} date={props.date}/>  //inserting two props in the same component


function Text(props){
    return(
    <div className="Comment-text">{props.values.text}
        <div className="Comment-date">{formatDate(props.values.date)}</div>
    </div>
    )
}
      
    <Text values={props}/>  //"nesting" props