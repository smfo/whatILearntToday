
# Rendering
To render a React element into a root DOME Node, pass both to ReactDOM.render()

```javascript
const element = <h1> Hello, world </h1>;
ReactDOM.render(element, document.getElementById('root'));
```

Elements are immutable and children or attributes cannot be changed. The element represents the UI at a certain 
point in time.\
Most apps only call ReactDOM.render() once, and use states to update the UI after changes

On update, the new element and its children are compared to their previous version, and only the necessary updates are made 
to brings the DOM to the desired state.


### Conditional rendering
Create components that encapsulate needed behavior, then render only some of them depending on the applications state.

Renders either UserGreeting og GuestGreeting depending on the isLoggedIn value
```javascript
function UserGreeting(props) {
    return <h1>Welcome back!</h1>;
  }
  
  function GuestGreeting(props) {
    return <h1>Please sign up.</h1>;
  }
  
//   the only function of this component if to return a component based on the isLoggedIn value
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


Variables can also be used to store elements.\ 
In this case, only parts of the component LoginControl is conditionaly rendered, whereas the rest stay unchanged
```javascript
  function LoginButton(props) {
    return (
      <button onClick={props.onClick}>
        Login
      </button>
    );
  }
  
  function LogoutButton(props) {
    return (
      <button onClick={props.onClick}>
        Logout
      </button>
    );
  }

  class LoginControl extends React.Component {
    constructor(props) {
      super(props);
      this.handleLoginClick = this.handleLoginClick.bind(this);
      this.handleLogoutClick = this.handleLogoutClick.bind(this);
      this.state = {isLoggedIn: false};
    }
  
    handleLoginClick() {
      this.setState({isLoggedIn: true});
    }
  
    handleLogoutClick() {
      this.setState({isLoggedIn: false});
    }
  
    render() {
      const isLoggedIn = this.state.isLoggedIn;
      let button;
      //the following section is conditionaly rendered
      if (isLoggedIn) {
        button = <LogoutButton onClick={this.handleLogoutClick} />;
      } else {
        button = <LoginButton onClick={this.handleLoginClick} />;
      }
  
      return (
        <div>
          <Greeting isLoggedIn={isLoggedIn} />
          {button}
        </div>
      );
    }
  }
  
  ReactDOM.render(
    <LoginControl />,
    document.getElementById('root')
  );
```

### if-else
If-else statements can be used directly in JSX, `condition ? if true : else`.

Used for small elements in the code
```javascript
render() {
    const isLoggedIn = this.state.isLoggedIn;
    return (
      <div>
        The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.
      </div>
    );
  }
```

Used for larger expressions
```javascript
  render() {
    const isLoggedIn = this.state.isLoggedIn;
    return (
      <div>
        {isLoggedIn
          ? <LogoutButton onClick={this.handleLogoutClick} />
          : <LoginButton onClick={this.handleLoginClick} />
        }
      </div>
    );
  }
```

### Inline if using &&

Use an if statement inline in JXS instead og the `condition ? if true : else` syntax, by adding
 `condition &&`. The element will render if the condition is true. If it is false nothing will render in it's place.
```javascript
  function Mailbox(props) {
    const unreadMessages = props.unreadMessages;
    return (
      <div>
        <h1>Hello!</h1>
        {unreadMessages.length > 0 &&
          <h2>
            You have {unreadMessages.length} unread messages.
          </h2>
        }
      </div>
    );
  }
        // true && expression, if the condition is true the element right after the if will appear in the output
        // its a normal if statement, behavior wise

  const messages = ['React', 'Re: React', 'Re:Re: React'];
  ReactDOM.render(
    <Mailbox unreadMessages={messages} />,
    document.getElementById('root')
  );
```

### Prevent rendering
To prevent a component from rendering, return null.\
This does not affect the fiering of the component's lifecycle mothods.

ex. componentDidUpdate will still be called
```javascript
function WarningBanner(props) {
    if (!props.warn) {
      return null; // the component isn't rendered even though it is rendered by the Page component
    }
  
    return (
      <div className="warning">
        Warning!
      </div>
    );
  }

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showWarning: true};
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    this.setState(state => ({
      showWarning: !state.showWarning
    }));
  }

  render() {
    return (
      <div>
        <WarningBanner warn={this.state.showWarning} /> //WarningBanner is always shown to render here
        <button onClick={this.handleToggleClick}>
          {this.state.showWarning ? 'Hide' : 'Show'}
        </button>
      </div>
    );
  }
}

ReactDOM.render(
  <Page />,
  document.getElementById('root')
);
```