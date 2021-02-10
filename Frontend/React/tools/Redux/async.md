# Async calls

## Redux-thunk

Library for handelig async calls.\
Returns functions from action creators instead of objects.

A function that wraps an expression in order to delay its evaluation.

```JS
//deleteAuthor wraps dispatch so it can execute later
export function deleteAuthor(authorId){
    return (dispatch, getState) => {
        return AuthorApi.deleteAuthor(authorId)
        .then(() => {
            dispatch(deleteAuthor(authorId));
        })
        .catch(handleError);
    };
}
```

Add thunk to the redux middleware to use.

```JS
npm install redux-thunk


import thunk from "redux-thunk";

return createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk, reduxImmutableStateInvariant()))
  );
```

## Redux project example

Create thunk that dispatches an action after async function is complete.

```JS
//calling action (indirectly)
this.props.actions.loadCourses().catch((error) => {
      alert("Loading courses failed " + error);
    });


//Action and thunk
import * as courseApi from "../../api/courseApi";

export function loadCoursesSuccess(courses) {
  return { type: types.LOAD_COURSES_SUCCESS, courses };
}

export function loadCourses() {
  return function (dispatch) {
    return courseApi
      .getCourses() //api function
      .then((courses) => {
        dispatch(loadCoursesSuccess(courses));
      })
      .catch((error) => {
        throw error;
      });
  };
}

//the reducer is handeled normally
switch (action.type) {
    case types.CREATE_COURSE:
      return [...state, { ...action.course }];
    case types.LOAD_COURSES_SUCCESS:
    //does not manipulate state because the api has already changed the object
      return action.courses;
    default:
      return state;
  }
```

Because the thunk function calls a promisse, we need to use a catch where the thunk is called as well.
