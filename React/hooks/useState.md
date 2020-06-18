
# useState()
The useState() is a Hook that returns a getter, that returns the current state value,
 and a setter, a function that lets you update the state value.\
We can set multiple states in the same component.

```javascript
const [inputText, setInputText] = useState(initalValue);

onChange={e => {
    setInputText(e.target.value);
}}
```

```javascript
function MultipleStates(){
    const [food, setFood] = useState('nanabanzuke');
    const [dinnerGuests, setDinnerGuests] = useState(4);
    const [todos, setTodos] = useState([{text: 'Buy ingredients'}]);
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