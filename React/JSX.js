

// JSX: Syntax extension to JS used to write React elements (render) and describes what you want to display on the screen
// jsx looks like html, but comes with the full power of JSON, any JS expression 
// can be placed within it 
// each react element in a js object that can be stored in a variable. ShoppingList can now be refered to 
// as <ShoppingList/>

//embedding variables in JSX
const name = "Synne"
const element = <h1>Hello, {name}!</h1>;

ReactDOM.render(
    element,
    document.getElementById('root')
)

// After compilation, JSX espressions become regular JS function calls, meaning the syntax can be used 
// inside if and for, assigned to variables, as arguments and return values

function getGreeting(user) {
    if (user) {
      return <h1>Hello, {formatName(user)}!</h1>;
    }
    return <h1>Hello, Stranger.</h1>;
  }
  
//   unike Angular, only use either "" or {} to specify attributes
const element = <div tabIndex="0"></div>;

const element = <img src={user.avatarUrl}></img>;



// this is not valid because the JSX expression must have one parent element
function Text(props){
    return(
    <div className="Comment-text">{props.text}</div>
    <div className="Comment-date">{formatDate(props.date)}</div>
    )
  }

//   the first div is now the parent, and this is allowed
function Text(props){
    return(
    <div className="Comment-text">{props.text}
      <div className="Comment-date">{formatDate(props.date)}</div>
    </div>
    )
  }

//   Components must always start with a capital letter, otherwise the element is passed to React.createElement
//   Custom components are passed to React.createElement(Foo)