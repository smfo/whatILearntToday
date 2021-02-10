# Testing

As a frontend library React components should generally not contain logic, and are therefore not that relevant to test.

## Create react app uses Jest for testing.

```javascript
describe("When setting up testing", () => {
  it("should fail", () => {
    expect(1 + 1).toBe(3);
  });
});
```

### Setup

```JS
npm install --save-dev jest

//in package.json
"test": "jest --watch(All)"
```

Create a babel.config.js file containing

```JS
module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current",
        },
      },
    ],
    //If using typescript
    '@babel/preset-typescript',
  ],
  //for JSX
  plugins: ["@babel/plugin-transform-react-jsx"],
};
```

Add mock style and files to package.json

```JS
"jest": {
    "moduleNameMapper": {
      "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/fileMock.js",
      "\\.(css|less)$": "<rootDir>/styleMock.js"
    }
  },

  //styleMock.js
  module.exports = {};

  //fileMock.js
  module.exports = "test-file-stub";
```

#### Component test

```javascript
import React from "react";

function Hello(props){
    return <h1>Hello at {props.now}<h1/>;
}

const moment = new Date(1588946400000000);

describe("When testing directly", () => {

    let results

    // setup function
    beforeAll(() => {
        result = Hello({now: moment.toISOString()});
    });

    it("return a value", () => {
        expect(result).not.toBeNull();
    });

    it("is a h1", () => {
        expect(result.type).toBe("h1");
    });

    it("has children", () => {
        expect(result.props.children).toBeTruthy();
    });
});

import ReactDOM from "react-dom";

describe("When testing with ReactDom", () => {
    it("render without creaching", () => {
        const div = document.createElement("div");
        ReactDom.render(<Hello now={moment.toISOString()} />, div);
    })
})

```

### Snapshopt

Jest uses renderer to create snapshots. A snapshot is a representation of a chosen component with specific inputs. In other words its a copy of the html that renders.

Jest will save the snapshots and then the next time the test is run it will compare the rendered html and see if it is the same as the saved snapshot.

```js
import React from "react";
import CourseForm from "./CourseForm";
import renderer from "react-test-renderer";
//mockdata
import { courses, authors } from "../../../tools/mockData";

it("sets submit button label 'Saving...' when saving is true", () => {
  const tree = renderer.create(
    <CourseForm
      //mockdata
      course={courses[0]}
      authors={authors}
      //jest.fn() creates empty mock function
      onChange={jest.fn()}
      onSave={jest.fn()}
      //saving = {true}
      saving
    />
  );

  expect(tree).toMatchSnapshot();
});
```

**jest.fn()** creates an empty mock function.

expect(tree).toNatchSnapshot() states that we expect the component rendered when the test is run, using the provided test data, to match the snapshot saved to the "sets submit button label 'Saving...' when saving is true" snapshot.\

This test will fail if they do not match.\
There can be two reasons for this. Values passed to the component in the test are changed, resulting in a change in the rendered component. F.ex setting saving=false instead of true. This will only happen if the test itself is changed.\
Or, what we are actually looking for, the component does not match the snapshot because the html in the component itself is changed. Ex. some text were edited or a tag were removed.\
Of course some times changes are intentional. In that case, typing `u` in the console will update the snapshots.

## Enzyme

Enzyme is a library created by AirBnb, that adds extra functionality to Jest (or other test runners that works with React).\
`npm i --save-dev enzyme enzyme-adapter-react-16`

```javascript
//Setup file
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

//Test file
describe("When testing with Enzyme", () => {
  it("renders a h1", () => {
    const wrapper = shallow(<Hello now={moment.toISOString()} />);
    expect(wrapper.find("h1").length).toBe(2);
  });

  it("contains Hello at 2020-05-08T14:00:00.00Z", () => {
    const wrapper = shallow(<Hello now={moment.toISOString()} />);
    expect(wrapper.contains(<h1>Hello at 2020-05-08T14:00:00.00Z</h1>)).toBe(
      true
    );
  });
});
```

It is only necessary with one Adapter. If enzyme will be used in multiple files, create the adaptor in a setup file and insert this in package.json.

```JS
  "jest": {
    "setupFiles": [
        //file location
      "./tools/testSetup.js"
    ],
```

**Find** element with this tag.\
**Simulate** user interactions, like hover or clicks.

### Shallow vs mount

Enzyme has two ways of renderin components.

Shallow renderes the tested component in isolation. There is no DOM and no child components available. When doing tests related to child components, all we can do is check if they are there.
In shallow rendering you don't have access to the components props.

```JS
it("contains 3 NavLinks via shallow", () => {
  const numLinks = shallow(<Header />).find("NavLink").length;
  expect(numLinks).toEqual(3);

  console.log(shallow(<Header />).debug())
});

//console output
//The final result of the rendered component
<nav>
        <NavLink to="/" activeStyle={{...}} exact={true}>
          Home
        </NavLink>
         |
        <NavLink to="/courses" activeStyle={{...}}>
          Courses
        </NavLink>
         |
        <NavLink to="/about" activeStyle={{...}}>
          About
        </NavLink>
</nav>
```

Mount createa a DOM in memory and renders child components. Because the child components render as well, we can test towards the tag that are actually defined inside the child components.

```JS
it("contains 3 anchors via mount", () => {
  const numAnchors = mount(
      <Header />
  ).find("NavLink").length;

  expect(numAnchors).toEqual(3);

  console.log(mount(
      <Header />
  ).debug());
});


//Console output
//Actually renders the child components
<MemoryRouter>
        <Router history={{...}}>
          <Header>
            <nav>
              <NavLink to="/" activeStyle={{...}} exact={true}>
                <Route path="\\/" exact={true} strict={[undefined]} location={[undefined]}>
                  <Link aria-current="page" className="active" style={{...}} to="/">
                    <a aria-current="page" className="active" style={{...}} onClick={[Function: onClick]} href="/">
                      Home
                    </a>
                  </Link>
                </Route>
              </NavLink>
               |
              <NavLink to="/courses" activeStyle={{...}}>
                <Route path="\\/courses" exact={[undefined]} strict={[undefined]} location={[undefined]}>
                  <Link aria-current={{...}} className={[undefined]} style={[undefined]} to="/courses">
                    <a aria-current={{...}} className={[undefined]} style={[undefined]} onClick={[Function: onClick]} href="/courses">
                      Courses
                    </a>
                  </Link>
                </Route>
              </NavLink>
               |
              <NavLink to="/about" activeStyle={{...}}>
                <Route path="\\/about" exact={[undefined]} strict={[undefined]} location={[undefined]}>
                  <Link aria-current={{...}} className={[undefined]} style={[undefined]} to="/about">
                    <a aria-current={{...}} className={[undefined]} style={[undefined]} onClick={[Function: onClick]} href="/about">
                      About
                    </a>
                  </Link>
                </Route>
              </NavLink>
            </nav>
          </Header>
        </Router>
      </MemoryRouter>
```

It is possible to access the components props using mount. These can be passed in by rendering the component as a child of another component, or they can be added on mount.\
They can then be accessed via `.props()`.

```JS
const wrapper = mount(<MyComponent includedProp="Success!"/>);
expect(wrapper.props().includedProp).to.equal('Success!');
```

### Props

To assert props we get the deciered component, use `props().propname`.

```JS
// where contender has a field name
<Contender key={contender.name} contender={contender} />


  it("first Contender name is 'Synne' via mount", () => {
    const comp = renderMount({
      contenders: [{ name: "Synne" }, { name: "Harry" }],
    });
    const firstContender = comp.find("Contender").first();
    expect(firstContender.props().contender.name).toBe("Synne");
  });
```

## React testing library

React testing library is a alternative to Enzyme. These tests are more focused around what the user sees instead of values in the component. ex. instead of testing that a value is true, the visual result of this value being true is tested.

Components in React testing library are always mounted.\
The assertion is automatic by writing the query (get...). See all queries [here](https://testing-library.com/docs/dom-testing-library/api-queries)

`npm install --save-dev @testing-library/react`

```JS
import React from "react";
import { cleanup, render } from "@testing-library/react";
import CourseForm from "./CourseForm";

//runs after each test
afterEach(cleanup);

function renderCourseForm(args) {
  const defaultProps = {
    authors: [],
    course: {},
    saving: false,
    arrors: {},
    onSave: () => {},
    onChange: () => {},
  };

  const props = { ...defaultProps, ...args };
  return render(<CourseForm {...props} />);
}

it("should render Add Course header", () => {
  const { getByText } = renderCourseForm();
  getByText("Add Course");
});

it("should label save button as 'Save' when not saving", () => {
  const { getByText } = renderCourseForm();
  getByText("Save"); //look anywhere in the output for this text
});

it("should label save button as 'Saving...' when saving", () => {
  const { getByText, debug } = renderCourseForm({ saving: true });
  debug();
  getByText("Saving...");
});
```
