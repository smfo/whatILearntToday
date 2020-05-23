

// Functions vs classes

class Clock extends React.Component {
    render() {
      return (
        <div>
          <h1>Hello, world!</h1>
          <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
        </div>
      );
    }
  }

// 1) A class extends React.Component
// 2) calls the method render() that encapsulates the body of the function
// 3) props is replaced with this.props

  function Clock(props) {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }

//   the render methos in the class will be called with every change, but there will only 
//   be one instance of Clock (in this DOM node)
//   this opens up for use of local state and lifecycle methods


// Mounting and unmounting (examples of lifecycle hooks)
// Mounting: setup a class when the component is rendered in the DOM for the first time 
// Unmounting: frees up resources when the component is destroyed

componentDidMount() { //runs after the component output has been rendered to the DOM
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() { //tears down the timer
    clearInterval(this.timerID);
  }