
# React.Fragment

Lets a component return multiple children without introducing a new node, typically a div, to the DOM.\
Instead of introdusing a new element to the DOM to act as a parent component,

```javascript
ReactDOM.render(
    <div>
        <Game />
        <Statis />
    </div> 
    document.getElementById("root"));
```

we can use React.Fragment,
```javascript
ReactDOM.render(
    <React.Fragment>
        <Game />
        <Statis />
    </React.Fragment> 
    document.getElementById("root"));
```

or the shortcut, using empty tags
```javascript
ReactDOM.render(
    <>
        <Game />
        <Statis />
    </> 
    document.getElementById("root"));
```

It is also posible to use keyed fragments.
```javascript
function Glossary(props){
    return(
        <dl>
            {props.items.map(item => (
                <React.Fragment key={item.id}>
                   <dt>{item.term}</dt>
                   <dd>{item.description}</dd>
                </React.Fragment>
            ))}
         </dl>
    );
}
```
Right now, key is the only attribut ethat can be passed to Fragment.