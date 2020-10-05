
# useState()
The useState() is a Hook that returns a getter, that returns the current state value,
 and a setter, a function that lets you update the state value.\
We can set multiple states in the same component.

```javascript
const [inputText, setInputText] = React.useState(initalValue);

onChange={e => {
    setInputText(e.target.value);
}}
```

```javascript
function MultipleStates(){
    const [food, setFood] = React.useState('nanabanzuke');
    const [dinnerGuests, setDinnerGuests] = React.useState(4);
    const [todos, setTodos] = React.useState([{text: 'Buy ingredients'}]);
}
```

**NB: instead of merging states like this.setState, the setter created by the state hook
replaces the previous state value when it is called.**

## class components

```javascript
//the state has to be declared
state = {
    inputText: initialValue
}

handleChange = event => {
    this.setState({
        inputText: event.target.value
    });
};
```

## Object

It is possible to add objects to a useState, this just requires a bit more
precission when using and setting the values later.\
The fields can be refered to as ```objectName.FieldName```. When setting the value, 
remember that useState does not append to the object, but updates all of it whenever the
state is changed

```JSX
function LoginForm() {
  const [form, setState] = useState({
    username: '',
    password: ''
  });

  const updateField = e => {
    setState({
      ...form, // keep the rest of the object values
      [e.target.name]: e.target.value // change any of the object values
    });
  };

  return (
    <form onSubmit={printValues}>
      <label>
        Username:
        <input
          value={form.username}
          name="username"
          onChange={updateField}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          value={form.password}
          name="password"
          type="password"
          onChange={updateField}
        />
      </label>
      <br />
      <button>Submit</button>
    </form>
  );
}
```