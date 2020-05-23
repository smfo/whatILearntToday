

// States are used to remember events and values
// This can update the UI without calling ReactDOM.render() again

// recalling tick() and therefore Clock and .render() every second
function Clock(props) {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
  
  function tick() {
    ReactDOM.render(
      <Clock date={new Date()} />,
      document.getElementById('root')
    );
  }
  
  setInterval(tick, 1000);

//   A state is private and fully controlled by the component


// Adding local state to a class
class Clock extends React.Component {
    constructor(props) {
      super(props);
      this.state = {date: new Date()}; // initiating the state
    }
  
    render() {
      return (
        <div>
          <h1>Hello, world!</h1>
          <h2>It is {this.state.date.toLocaleTimeString()}.</h2> //accessing the components state
        </div>
      );
    }
  }
  
  ReactDOM.render(
    <Clock />, //there is no longer need to pass the date as a input, that's just the case in this example
    document.getElementById('root')
  );

//   instead of using this.props, we use this.state variables. This is because the variable will change 
//   value as time passes, the state can change while the props cannot 
//   This initial state is assigned in the class constructor 
//   super(props), all JavaScrip (sub)classes need to start with calling super


tick() {
    this.setState({
      date: new Date()
    });
  }

//   when setState is called, the render() methos id called again and the DOM is updated with 
//   the output

// Do not modify state directly, this.state can only be assigned in the constructor
// Wrong
this.state.comment = 'Hello';
// Correct
this.setState({comment: 'Hello'});

// State updates may be asynchronous
// this.state and this.props might be updated at the same time to increase performance, therefore these should not be 
// used to calculate the next state 
// Wrong
this.setState({
    counter: this.state.counter + this.props.increment,
  });

//   Instead use setState() with a function rather than an Object, this will receive the previous state as the first
//   argument and the new calculated values will be correct
// Correct
this.setState((state, props) => ({
    counter: state.counter + props.increment
  }));

// State updates are merged
constructor(props) {
    super(props);
    this.state = {
      posts: [],
      comments: []
    };
  }

  componentDidMount() {
    fetchPosts().then(response => {
      this.setState({
        posts: response.posts
      });
    });

    fetchComments().then(response => {
        //this compleatly replaces this.state.comments, however leaves this.state.posts intact
      this.setState({
        comments: response.comments
      });
    });
  }

//   State is only accesible to the component that owns/sets instanceof. Parent or child components cannot know if a
//   certain component is stateful of stateless. 
//   However, a component might choose to pass its state as props to its children

<FormattedDate date={this.state.date} />
// FormatterDate will recive the state, but won't know where this value came from (the parents state, props or hard coded)
// Any state is always owned by a specific component, and the data might only affect components "below" them in the tree



// Lifting states to parent component
// To keep multiple child components state in sync with eachother, and to keep them in sync with the parent, it is normal
// to pass the statehandeling of each child up to the parent. The parent will then keep hold of all the states and pass 
// the state to the specific child using props.

// Update parent component based on changes in child
// The childcomponent cannot directly update the state of the parent component. What it can do, is call a function 
// in the parent component when it is, for example, clicked
// that function is passed from the parent to the child
renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)} //run this.handleClick() whenever Square is clicked
      />
    );
  }

// this will be called by Square like so
this.props.onClick();

<button className="square" onClick= {() => this.props.onClick()}>
        {this.props.value}
      </button>