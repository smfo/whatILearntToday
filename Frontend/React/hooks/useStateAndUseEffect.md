# useState and useEffect

Some times we want to change something when a state is updated. It is easy to put all the things we want to do in one function and expect it to happen. This is not always the case.

## useEffect
The states used in the useEffect function is a reflection of their values before the useEffect is called. Changes will not be reflected until the component is next rerendered, and state changes will therefore not be available before the function is finished.


This code will use an empty currentStudent value to get the studentId.
```js
const [currentStudent, setCurrentStudent] = useState();

useEffect(() => {
    setCurrentStudent(props.student)
    studentId = getStudentId(currentStudent);
  }, []);

```

To register changes to a state we always need to trigger change on state update using useEffect.
```js
const [currentStudent, setCurrentStudent] = useState();

useEffect(() => {
    setCurrentStudent(props.student)
  }, []);

useEffect(() => {
    studentId = getStudentId(currentStudent);
}, [currentStudent])

```