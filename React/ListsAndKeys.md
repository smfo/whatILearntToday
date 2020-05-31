
# Lists and keys


### Rendering multiple components
Collections of elements can be included in JSX like so

```javascript
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li>{number}</li>
);
```
When using maps, the function takes an array, does something to every 
element in it and returns an array with the modified elements.

### Keys
Keys are given to elements inside the array to distuinguish them, 
and are used to identify which items have changed, these are added or removed from the list.
```javascript
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li key={number.toString()}>
    {number}
  </li>
);
```
It is best to give unique keys (they only need to be unique withing that array)

```javascript
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
```

Keys don't get passed to the component, if the value of the key is needed, pass it as a regular prop with a different name
```javascript
const content = posts.map((post) =>
  <Post
    key={post.id}
    id={post.id}
    title={post.title} />
);
```
props.key is not available in Post, whereas props.id is

Inlined version
```javascript
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
  ```