
# Custom hooks

Cusomt hooks allows for extraction of component logic into reusable functions and simplify elements.\
The name of the hook should start with "use".
```javascript
 useFriendStatus = (friendID) => {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });

  return isOnline;
}
```
This custom hook can now be used in multiple elements in the program.

Unlike components, custom hooks can decide what arguments to take, and what to return.

```javascript
const useGameState = () => {
  const [stars, setStars] = useState(utils.random(1, 9));
  const [availableNums, setAvailableNums] = useState(utils.range(1, 9));
  const [candidateNums, setCandidateNums] = useState([]);
  const [secondsLeft, setSecondsLeft] = useState(10);

  useEffect(() => {
    if (secondsLeft > 0 && availableNums.length > 0) {
      const timerId = setTimeout(() => setSecondsLeft(secondsLeft - 1), 1000);
      return () => clearTimeout(timerId);
    }
  });

  const setGameState = (newCandidateNums) => {
    if (utils.sum(newCandidateNums) !== stars) {
			setCandidateNums(newCandidateNums);
    } else {
      const newAvailableNums = availableNums.filter(
        n => !newCandidateNums.includes(n)
      );
      setStars(utils.randomSumIn(newAvailableNums, 9));
      setAvailableNums(newAvailableNums);
      setCandidateNums([]);
    }
  };

  return { stars, availableNums, candidateNums, secondsLeft, setGameState };
};

const Game = props => {
  const {
    stars,
    availableNums,
    candidateNums,
    secondsLeft,
    setGameState,
  } = useGameState();

    .....
};

  ```
  This example does not take any arguments, and returns 5.

## Combine hooks to create new custom hooks
Why: complex code uses a lot of hooks. That gets messy and has a lot of boilerplate code.

What data is passed in, what do you need it to return?

```javascript
// the custom hook
const useEmailValidation = (secondsFormValidFor) => {
  const validateEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };
  const [emailValid, setEmailValid] = useState(false);
  const reducer = (state, action) => {
    state = action;
    setEmailValid(validateEmail(state));
    return action;
  };
  const [email, setEmail] = useReducer(reducer, "");
  const [count, setCount] = useState(secondsFormValidFor);
  useInterval(
    () => {
      setCount(count - 1);
    },
    count > 0 ? 1000 : null
  );

  return { count, email, setEmail, emailValid };

};

export default useEmailValidation


// how to use in component
const { count, email, setEmail, emailValid } = useEmailValidation(10);
```