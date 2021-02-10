# useCallback

Returns a memoized version of the callback.

**Memoization**
Technique used for speed up computer programs by storing the results of expensive function calls and 
returning this cached result if the same input is being passed to the function.

useCallback caches a function, while useMemo caches a value.

Pass an inline callback and an array of dependencies.
The memoized version of the callback will only change if one of the dependencies has changed. This is usefull
to prevent unnecessary rendering of child components.

```javascript
const momoizedCallback = useCallback(() => {
    doSomething(a, b);
    },
    [1,2],
);
```
```javascript
//speaker.js
const heartFavoriteHandler = useCallback((e, favoriteValue) => {
    e.preventDefault();
    const sessionId = parseInt(e.target.attributes["data-sessionid"].value);
    dispatch({
      type: favoriteValue === true ? "favorite" : "unfavorite",
      sessionId
    });
  },[]);

<SpeakerDetail
  key={id}
  id={id}
  favorite={favorite}
  onHeartFavoriteHandler={heartFavoriteHandler}
  firstName={firstName}
  lastName={lastName}
  bio={bio}
/>

//speakerDetails.js
const SpeakerDetail = React.memo(() => {
    return(...)
});
```

Set useCallback on the expensive function that we want to be cached, and React.memo on the values we want
the child component to return. This is done by wrapping the entire functional component.

`[a,b]` are the dependencies passed to useCallback, the values doSomething are dependent on that are not passed as arguments.

# useMemo

Returns a momoized value.

When passing a create function and an array of dependencies, useMemo will only recompute memoized value when on of the 
dependenzies has changed. This helps preventing expensive calculations of every render.\
If no value is provided, a new value will be computed on every render.

Only pass functions that run during rendering, side effects belong in useEffect.

```javascript
const memoizedValue = useMemo(() => {return computeExpensiveValue(a,b)}, [1,2]);
```

```javascript
const [speakingSaturday, setSpeakingSaturday] = useState(true);
const [speakingSunday, setSpeakingSunday] = useState(true);
const [speakerList,dispatch] = useReducer(speakersReducer, []);

const sortedSpeakerList = useMemo(() => {return speakerList.filter(...)},
    [speakingSaturday, speakingSunday, speakerList]);
```
The list of dependencies are `[speakingSaturday, speakingSunday, speakerList]`, if any of these are changed useMemo will run again
on the next render.

## useMemo vs useEffect + useState
The useEffect + useState method will execute after the render has happened, as is the nature of
useEffect. Because a state is changed this will force a new render. This will not happen when
using useMemo.

However, useMemo should not be used if the values are returned from a async function as this will
just return a promisse.

```JSX
const useCalculate = numberProp => {
    const [result, setResult] = useState<number>(null);

    useEffect(() => {
        setResult(expensiveCalculation(numberProp));
    }, [numberProp]);

    return result;
};
```

```JSX
const useCalculateWithMemo = numberProp => {
    return useMemo(() => {
        return expensiveCalculation(numberProp);
    }, [numberProp]);
};
```