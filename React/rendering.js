

// To render a React element into a root DOME Node, pass both to ReactDOM.render()

const element = <h1> Hello, world </h1>;
ReactDOM.render(element, document.getElementById('root'));

// elements are immutable and children or attributes cannot be changed; the element represents the UI at a certain 
// point in time 
// most apps only call ReactDOM.render() once, how do they do that: fill in

// on update, the new element and its children are compated to their previous version, and only the necessary updates are made 
// this brings the DOM to the desired state