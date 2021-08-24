
## Ternary operator
In the JSX show this if condition is meet, otherwise show this

```javascript
return (
    ...
    { eleverPaOgUnderOppfolgingsgrenseResultater.length > 0 
        ? Gjør noe her
        : <p>Ingen elever har tatt prøven</p>}
)
```

## As a function
Return the desiered output from a function that is called in the JSX.

```javascript
function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

ReactDOM.render(
  // Try changing to isLoggedIn={true}:
  <Greeting isLoggedIn={false} />,
  document.getElementById('root')
);
```

## Conditional rendering
Condition && to be rendered\
This will be rendered if the condition is true, no need for a false alternative.

```javascript
return (
    ...
    { eleverPaOgUnderOppfolgingsgrenseResultater.length > 0 
        && Gjør noe her
    }
)
```