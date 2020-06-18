
# Effect hooks

The effect hooks allows for adding side effects in funtion components.\
The useEffect tells the component it needs to do something after rendering, and it
 will run every time the element is rendered.

The first parameter is a function that runs when the component mounts, 
the second is the condition under which the side effect will fire.

```javascript
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API, this is the effect
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

### Effects without cleanup
ex. network requests, manual DOM mutations, logging\
These don't require cleanup because they can be run and immeadiatly forgotten about.

### Effects with cleanup
When introducing effects that require cleanup, such as subscriptions, it is important to clean up
to avoid memory leaks.\
If the effect returns a function, this will automatically be run when it is time to clean up.
This means that if a component renders multiple times the previous effect is cleaned up before the 
next effect is executed.
```javascript
function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    // Specify how to clean up after this effect:
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```

#### Unmounting and remounting
To reset the the sideeffects, and the state, in an element, we can unmount and remount it.
That means that we remove the current "instance" of the element from the DOM and adds a new, fresh
"instance".\
The easiest way to do this is to change the key of the element as react will now view this as a complealt
new element.

```javascript
const StarMatch = () => {
	const [gameId, setGameId] = useState(1);
	return <Game key={gameId} startNewGame={() => setGameId(gameId + 1)}/>;
}
```
This will render a new instance of Game when setGameId is called.

### Conditional fiering
While the default behaviour is to fire after every complete render, side effects can be sat to fire under
certain conditions. This condition is passed as a second argument to useEffect, this is an array of values
that the effect depends on.
```javascript
useEffect(
  () => {
    const subscription = props.source.subscribe();
    return () => {
      subscription.unsubscribe();
    };
  },
  [props.source],
);
```
The subscription will only be recreated when props.source changes.

### Timing of effects
It is not desierable to execute side effects that do DOM mutation after the render method
has been run. For this React has **useLayoutEffect**. It acts the same way as useEffect, and only differ
in when it fiers.\
useLayoutEffect fiers synchronously after all DOM mutations, before the browser has a chanse to paint.\
Only use when neccessary.

## Class component
Using functional components, we only have to write and maintain one function as supposed to three, that also
has to be syncronized.
```javascript
// with useEffect
const MyFunct = () => {
  useEffect(() => {
    console.log("mounting")
    return () => {
      console.log("dismounting")
    };
  }, [isLoading]);
};

// class component
class MyComp extends React.Component {
  componentDidMount() {
    console.log("mounting");
  }

  componentDidUpdate(prevProps, prevState){
    console.log("dependency-chk");
  }

  componentWillUnmount(){
    console.log("dismounting");
  }
};
```

With useEffect the function is run on render and every time a dependency changes. When the component is destroyed
the return function is run.

componentDidMount only runs once when the component renders. Like when there are no dependencies passed to useEffect. (Angular: onInit)\
componentDidUpdate gets passed all old props and states on a state change. It is up to the function to determine if this
change is significant and what to do if it is. (Angular: onChanges)
```javascript
componentDidUpdate(prevProps, prevState){
  if(this.state.isLoading !== prevState.isLoading){
    this.setState({
      inView: this.isInView()
    });
  }
}
```
componentWillUnmount runs once when the component is destroyed. (Angular: onDestroy)