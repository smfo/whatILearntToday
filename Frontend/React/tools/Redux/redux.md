# Redux

Used to hold global states\
`npm install redux react-redux`

## Principle

All states are stored in the store. This is global and can be accessed by any component in the application. Sort of like a client side, local db.\
States cannor be directly changed by the components. Instead they ammit actions that trigger changes. An action is an object with a type property and some data.\
The part that actually changes the state is the reducer. These are funtions that take the current state and an action as parameters and use these to update the state in the store.

After the store is updated, React rerenders every component connected to this data.

## Action

Events happening, must have a type property.

This is an action creator, the are not required, but recommended to use. The action itself is the object being retuned.

```JSX
//save the action names as constants, to prevent spelling errors
export const RATE_COURSE = "RATE_COURSE";


import * as types from "somewhere";

//{type: actionName (created here), pluss whatever you want}
export function rateCourse(rating){
    return { type: types.RATE_COURSE, rating: rating }
}
```

## Store

The store can dispatch actions, subscribe to listeners, get states and replace reducers. The only way to access the store is to dispatch actions, it cannot be modified directly.

### Setup

To create a store we need to call `createStore(reducer) `, this is typically done in a config file.

The commented out parts are not mandatory to get the store to work, they are extra to set up support for Redux devtools.\
initialState is a optional input that can be passed from the rootcomponent of the application. If it is not passed, Redux will set up it's own default state.\
See Reducers to read about the rootReducer.

```JS
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import reduxImmudatleStateInvariant from "redux-immutable-state-invariant";

export default function configureStore(initialState) {
  //add support for Redux dev tools (chrome)
//   const composeEnhancers =
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  return createStore(
    rootReducer,
    initialState,
    // composeEnhancers(applyMiddleware(reduxImmudatleStateInvariant()))
  );
}

```

Use Redux immudatle state invariant to prevent the app from allowing mutation of states in the reducer.\
`npm install --save-dev redux-immutable-state-invariant`

To be able to use the store in the application, the store has to be provided through the root component. Now, the store can be accessed by any child component.

```JS
import configureStore from "./redux/configureStore";
import { Provider as ReduxProvider } from "react-redux";

//only pass initial state to override the default
const store = configureStore();

render(
  <ReduxProvider store={store}>
    <Router>
      <App />
    </Router>
  </ReduxProvider>,
  document.getElementById("app")
);
```

## Immutability

Instead of changing a state object, a new state object is returned (numbers, strings, boolean, undefined and null are all immutable).

```JSX
//old state
state = {
    name: "Synne",
    role: "admin"
}

//new state
return state = {
    name: "Synne",
    role: "guest"
}
```

Some methods to prevent having to copy all values every time we want to create a immutable object.

**Object.assign**\
NB: does not clone nested objects! But only if these values are changed\
`Object.assign(target, ...sources for new values)`

When creating a new target, remember to pass in an empty object as the target.\
`Object.assign({}, state, {role: "guest"})`

**Spread**\
NB: does not clone nested objects! But only if these values are changed\
`const newState = { ...state, role: "admin" };`

**Immer**\
Library for handeling immutable code. (There are many more)

```JS
import produce from "immer";

const user = {
    name: "Synne",
    address: {
        state: "NY"
    }
};

const userCopy = produce(user, draftState => {
    draftState.address.state = "CA"
})
```

## Reducers

Handles state updates.

```JS
//reducer(state, action) => new state

export default function myReducer(state, action){
    switch (action.type){
        case "INCREMENT_COUNTER":
            return { ...state, counter: state.counter + 1 };
        default:
            return state;
    }
}
```

These things should never be done in a Reducer:

- Mutate arguments (create new variables instead)
- Perform side effects
- Call non-pure functions (functions that does not return the same result whenever called with the same parameters)

On store.dispatch ALL reducers are called. The switch method decides if the specific reducer matches the changes made or should not make any changes. That is why all reducers by default return the original state.

Each reducer can handler one or more actions. One action can be handeled by one or more reducers.

**Initial state**
The initial state can be set directly in the reducer like so `export default function courseReducer(state = [], action)`. Or in a seperate file.

```JS
export default {
  courses: [],
  authors: [],
};


import initialState from "./initialState";

export default function courseReducer(state = initialState.courses, action)
```

### RootReducer

An export that combine all reducers into one reducer, in order to save and pass the entire updated state to the store.

```JS
import { combineReducers } from "redux";
import courses from "./courseReducer";
import authors from "./authorReducer";

const rootReducer = combineReducers({
  courses: courses,
  authors: authors,
});

export default rootReducer;
```

## React-Redux

### Provider

Attaches the components to the redux store. Is declared in the root component and made available to all child components.

Also see "state- setup".

```JS
<Provider store={store}>
    <App />
</Provider>
```

### Connect

Wraps a component so it is connected to the Redux store. What state and what actions do you want to pass.

```JS
import { connect } from "react-redux";

export default connect(mapStateToProps, mapDispatchToProps)(ComponentName);
```

**mapStateToProps:** which states should be exposed as props on the component. The component will subscribe to the redux store updates. which states are available to this component.

```JS
function mapStateToProps(state, ownProps){
    return {authors: state.authors};
}
```

ownProps are props that belong to the component, importing this arg makes the rest of the components props available in mapStateToProps.

```JS
function mapStateToProps(state, ownProps) {
  //accessing match from Route props
  const slug = ownProps.match.params.slug;
  const course =
    slug && state.courses.length > 0
      ? getCourseBySlug(state.courses, slug)
      : newCourse;
  return {
    course,
    courses: state.courses,
    authors: state.authors,
  };
}
```

**mapDispatchToProps:** which actions are available to this component. This can be written in a number of ways, one example:

```JS
import * as courseActions from "../../redux/actions/courseActions";
// Remember to set the PropTypes too!

//manual approach
function mapDispatchToProps(dispatch){
    return{
        loadCourses: () => {
            dispatch(courseActions.loadCourses());
        },
        createCourse: (course) => {
            dispatch(courseActions.createCourse(course));
        },
        updateCourse: (course) => {
            dispatch(courseActions.updateCourse(course));
        }
    };
}

this.props.loadCourse();

//bindActionCreators
function mapDispatchToProps(dispatch){
    return {
        //wraps all the actions from courseActions in dispatch
        actions: bindActionCreators(courseActions, dispatch)
    }
}

this.props.actions.loadCourse()

//as object
const mapDispatchToProps = {
    loadCourse: courseActions.loadCourse,
    createCourse: courseActions.createCourse,
    updateCourse: courseActions.updateCourse
}

this.props.loadCourse();
```

### useSelector and useDispatch

The greatest thing that has ever happened to replace Connect.\
`import {useSelector, useDispatch} from 'react-redux'`

**useSelector**\
Replaces mapToProps. Takes a function argument that returns the part of the state you want

```js
const counter = useSelector((state) => state.counter);
const currentUser = useSelector((state) => state.currentUser);
```

**useDispatch**\
Sort of replaces mapDispatchToProps. We import useDispatch and save it as a constant, with this we can dispatch actions directly in the code instead of calling the dispatch that is defined in matDispatchtoProps.

```js
//manual approach
function mapDispatchToProps(dispatch) {
  return {
    loadCourses: () => {
      dispatch(courseActions.loadCourses());
    },
    createCourse: (course) => {
      dispatch(courseActions.createCourse(course));
    },
    updateCourse: (course) => {
      dispatch(courseActions.updateCourse(course));
    },
  };
}
//called in the code like so
this.props.loadCourse();

//useDispatch (all happening in main function)
const dispatch = useDispatch();

//dispatch action wherever you want to use it in the code
dispatch(courseActions.loadCourses());
dispatch(courseActions.createCourse(course));
dispatch(courseActions.updateCourse(course));
```
