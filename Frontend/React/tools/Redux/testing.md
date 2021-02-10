# Testing Redux - with Jest

## Container components

This applies to testing of components that are using Redux, so components that are wrapped in connect().

There are two ways to test these, either by wrapping the component in a Provider and mocking a store, or to import the component without the connect() wrapper and test it like that.

```JS

//export named component, as well as a default using connect
export function ManageCoursePage({

//in the test, make sure to import the named component
import { ManageCoursePage } from "./ManageCoursePage";


function render(args) {
  const defaultProps = {
    authors,
    courses,
    history: {},
    saveCourse: jest.fn(),
    loadAuthors: jest.fn(),
    loadCourses: jest.fn(),
    course: newCourse,
    match: {},
  };

  const props = { ...defaultProps, ...args };

  return mount(<ManageCoursePage {...props} />);
}

it("sets error when attempting to save an empty title field", () => {
  const wrapper = render();
  wrapper.find("form").simulate("submit");
  const error = wrapper.find(".alert").first();
  expect(error.text()).toBe("Title is required.");
});

```

## Actions

Only have to check if the action emits the correct object.

Write a normal unit test.

```JS
describe("createCourseSuccess", () => {
  it("should create a CREATE_COURSE_SUCCESS action", () => {
    //arrange
    const course = courses[0];
    const expectedAction = {
      type: types.CREATE_COURSE_SUCCESS,
      course,
    };

    //act
    const action = courseActions.createCourseSuccess(course);

    //assert
    expect(action).toEqual(expectedAction);
  });
});
```

### Thunk

A bit trickier cause they are async and often interact with a API, need to mock these.

```JS
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import configureMockStore from "redux-mock-store";

// Test an async action
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("Async Actions", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  describe("Load Courses Thunk", () => {
    it("should create BEGIN_API_CALL and LOAD_COURSES_SUCCESS when loading courses", () => {
      fetchMock.mock("*", {
        body: courses,
        headers: { "content-type": "application/json" },
      });

      const expectedActions = [
        { type: types.BEGIN_API_CALL },
        { type: types.LOAD_COURSES_SUCCESS, courses },
      ];

      const store = mockStore({ courses: [] });
      return store.dispatch(courseActions.loadCourses()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});
```

## Reducers

Call the action with a known value, and test the value of the new state after passing through the reducer.

```JS
import courseReducer from "./courseReducer";
import * as actions from "../actions/courseActions";

it("should add course when passed CREATE_COURSE_SUCCESS", () => {
  // arrange
  const initialState = [
    {
      title: "A"
    },
    {
      title: "B"
    }
  ];

  const newCourse = {
    title: "C"
  };

  //the action object is only created, not dispatched to the reducer
  const action = actions.createCourseSuccess(newCourse);

  // run the reducer with initial state and the dispatched action
  const newState = courseReducer(initialState, action);

  // assert
  expect(newState.length).toEqual(3);
  expect(newState[0].title).toEqual("A");
  expect(newState[1].title).toEqual("B");
  expect(newState[2].title).toEqual("C");
});
```

## Store

Interaction test between Actions, Reducer and Store.

Create an object and send it to an action as a argument. This will then be sent to the reducer and the state will be changed. Lastly, compare the expected object to the object in the store.

```JS
import { createStore } from "redux";
import rootReducer from "./reducers";
import initialState from "./reducers/initialState";
import * as courseActions from "./actions/courseActions";

it("Should handle creating courses", function() {
  // arrange
  const store = createStore(rootReducer, initialState);
  const course = {
    title: "Clean Code"
  };

  // act
  const action = courseActions.createCourseSuccess(course);
  store.dispatch(action);

  // assert
  const createdCourse = store.getState().courses[0];
  expect(createdCourse).toEqual(course);
});

```
