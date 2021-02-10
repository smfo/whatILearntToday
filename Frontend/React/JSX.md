
# JSX

JSX: Syntax extension to JS used to write React elements (render) and describes what you want to display on the screen.
Jsx looks like html, but comes with the full power of JSON, any JS expression can be placed within it.
Each react element in a js object can be stored in a variable.\
ShoppingList can now be refered to as `<ShoppingList/>`

### Embedding variables in JSX
```javascript
const name = "Synne"
const element = <h1>Hello, {name}!</h1>;

ReactDOM.render(
    element,
    document.getElementById('root')
)
```

After compilation, JSX espressions become regular JS function calls, meaning the syntax can be used 
inside if and for, assigned to variables, as arguments and return values.

```javascript
function getGreeting(user) {
    if (user) {
      return <h1>Hello, {formatName(user)}!</h1>;
    }
    return <h1>Hello, Stranger.</h1>;
  }
```
  
Unike Angular, only use either "" or {} to specify attributes
```javascript
const element = <div tabIndex="0"></div>;

const element = <img src={user.avatarUrl}></img>;
```

This is not valid because the JSX expression must have one parent element/tag
```javascript
function Text(props){
    return(
    <div className="Comment-text">{props.text}</div>
    <div className="Comment-date">{formatDate(props.date)}</div>
    )
  }
```

The first div is now the parent, and this is allowed
```javascript
function Text(props){
    return(
    <div className="Comment-text">{props.text}
      <div className="Comment-date">{formatDate(props.date)}</div>
    </div>
    )
  }
```

Components must always start with a capital letter, otherwise the element is passed to React.createElement,
whereas custom components should be passed to React.createElement(Foo).

#### Spread
JSX support E5's spread syntax and allows for inserting multiple props at the same time using {...}.

```javascript
function Sum(props){
  return
  <h1> {props.a} + {props.b} = {props.a + props.b }</h1>;
}

const props = {a:2, b:4};
const element = <Sum {...props} />
```


#### Children
JSX element tags can have content. This will be the elements children.
```javascript
<Sum> 
  <h1> I am a sum child <h1/>
</Sum>
```

Children will be passed just as normal props, they will not be rendered automatically.\
The example renders the child passed.
```javascript
function Sum(props){
  return <div>{props.children}</div>
}
```