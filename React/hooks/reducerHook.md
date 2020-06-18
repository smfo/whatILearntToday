# useReducer

useReduser is what useState is built on.\
Prefered to useState when having complex state logic that involves multiple sub-values or when the next state depends on the previous one.

**Reducer**
A reducer takes in two parameters, a precious state and an action/function, and returnes a new state
`(previousState, action) => newState`

```javascript
// const [speakerList, setSpeakerList] = useState("");
function speakersReducer(state, action){
    function updateFavorite(favoriteValue){
        return state.map((item, index) => {
            if(item.id === action.sessionId) {
                item.favorite = favoriteValue;
                return item;
            }
            return item;
        });
    }
    //allows for multiple changes within the same reducer
    switch (action.type){
        case "setSpeakerList":{
            return action.data;
        }
        case "favorite":{
            return updateFavorite(true);
        }
        case "unfavorite":{
            return updateFavorite(false);
        }
        default;
            return state;
    }
}

const [speakerList, dispatch] = useReducer(speakersReducer, []);

//setSpeakerList(speakerListServerFilter);
dispatch({
    type: "setSpeakerList",
    data: speakerListServerFilter
});

dispatch({
    type: favoriteValue === true ? "favorite" : "unfavorite",
    sessionId
})
```

Reducers can be placed in their own files to keep the code more organized.

To initialize the state, either pass the initial state as a second argument
```javascript
const [state, dispatch] = useReducer(
    reducer,
    {count: initialCount}
  );
  ```
or use lazy initialization.\
This is done by passing the init function as a third argument, as well as the initial value as the second argument.
```javascript
function init(initialCount) {
  return {count: initialCount};
}

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    case 'reset':
      return init(action.payload);
    default:
      throw new Error();
  }
}

function Counter({initialCount}) {
  const [state, dispatch] = useReducer(reducer, initialCount, init);
  return (
    <>
      Count: {state.count}
      <button
        onClick={() => dispatch({type: 'reset', payload: initialCount})}>
        Reset
      </button>
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}
```
The logic in init can now be reused in a different scenario.\
The initial value will be set to `init(initialArg)`.