



// rendering multiple components
// collections of elements can be included in JSX like so
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li>{number}</li>
);

// listItems if the resulting array of numbers
ReactDOM.render(
    <ul>{listItems}</ul>,
    document.getElementById('root')
  );
//   the entire list if rendered to the DOM

// usually lists will be rendered inside components, not ReactDOM itself
function NumberList(props) {
    const numbers = props.numbers;
    const listItems = numbers.map((number) =>
      <li key={number.toString()}> // a string attribute needed to create a list of elements
        {number}
      </li>
    );
    return (
      <ul>{listItems}</ul>
    );
  }
  
  const numbers = [1, 2, 3, 4, 5];
  ReactDOM.render(
    <NumberList numbers={numbers} />,
    document.getElementById('root')
  );

//   Keys
// identify which items have ListeningStateChangedEvent, are added or removed from the list
// should be given to elements inside the array to distuinguish them
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li key={number.toString()}>
    {number}
  </li>
);
// it is best to give unique keys (they only need to be unique withing that array)

// extraction
function ListItem(props) {
    // Correct! There is no need to specify the key here:
    return <li>{props.value}</li>;
  }
  
//   the list consists of ListItem components, therefor it is the ListItem components that need to be assigned a key
  function NumberList(props) {
    const numbers = props.numbers;
    const listItems = numbers.map((number) =>
      // Correct! Key should be specified inside the array.
      <ListItem key={number.toString()} value={number} />
    );
    return (
      <ul>
        {listItems}
      </ul>
    );
  }
  
  const numbers = [1, 2, 3, 4, 5];
  ReactDOM.render(
    <NumberList numbers={numbers} />,
    document.getElementById('root')
  );
//   (elements inside the map() call needs to be assigned the key)

// keys don't get passed to the component, if the value of the key is needed, pass it as a regular prop with a different name
const content = posts.map((post) =>
  <Post
    key={post.id}
    id={post.id}
    title={post.title} />
);
// props.key is not available in Post, whereas props.id is


// simplify array creation in JSX
// creating a new variable const listItems
function NumberList(props) {
    const numbers = props.numbers;
    const listItems = numbers.map((number) =>
      <ListItem key={number.toString()}
                value={number} />
    );
    return (
      <ul>
        {listItems}
      </ul>
    );
  }

// inlined version
  function NumberList(props) {
    const numbers = props.numbers;
    return (
      <ul>
        {numbers.map((number) =>
          <ListItem key={number.toString()}
                    value={number} />
        )}
      </ul>
    );
  }