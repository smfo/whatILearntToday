# React router

Used to nagivate between components in an application. Client side routing.

"Which component should load for a given url".\
Documentation [here](https://reactrouter.com/core/api/Hooks).

## Route

Wrapping the top component in the component tree, allows for declaring Routes
in all the following components in the tree.

```js
import { BrowserRouter as Router } from "react-router-dom";

render(
  <Router>
    <App />
  </Rounter>,
  document.getElementById("root")
);
```

When declaring a route, specify which url this route will apply to, and which
component to load for this url.

**Exact:** add to a route if you only want to display the route if the path is an exact match. If this is not used, paths like `path="/"` will render on all pages containing a /.

```JSX
//App component
import { Route } from "react-router-dom";

function App() {
  return (
    <div className="container-fluid">
        <Route exact path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/courses" component={CoursesPage} />
    </div>
  );
}
```

### Parameters

Parameters in Routes are noted by `:parameterName`

```JSX
//App component
import { Route } from "react-router-dom";

function App() {
  return (
    <div className="container-fluid">
        <Route path="/courses/:courseId" component={CoursesPage} />
    </div>
  );
}

//set parameter
<Link to={"/course/" + id }>
```

To access the parameters in the component that is being displayed, the component needs to accept props. If this is done, history, location and match will automatically be passed by react router sinde the component is loaded by react router. And the parameter values can be accessed.

```JSX
const CoursePage = props => {
    //props.match.params.parameterName
    props.match.params.courseId
}
```

Redirecting using history:\
`history.push("/courses");`

## Link

Link creates anchors that navigates between pages without reloading the entire page.\

Links "to" specifies which path to go to. This is caught by the Route set up in App, that navigates to the correct component. In this case AboutPage.

```JSX
import { Link } from "react-router-dom";

//className is styling that is always prevelen on the link, activeClassName is different
<Link to="about" className="some css class">
```

## NavLink

NavLink is like Link but has some extra parameters. One example is activeClassName, which takes the name of a css class that will style the link when it is active.

```JSX
import { NavLink } from "react-router-dom";

const Header = () => {
  const activeStyle = { color: "#F15B2A" };

  return (
    <nav>
      <NavLink to="/" activeStyle={activeStyle} exact>
        Home
      </NavLink>
      {" | "}
      <NavLink to="/courses" activeStyle={activeStyle}>
        Courses
      </NavLink>
      {" | "}
      <NavLink to="/about" activeStyle={activeStyle}>
        About
      </NavLink>
    </nav>
  );
};
```

## Switch

Switch tells the Route to stop looking for matching Routes if one Route is a match.\
The Route without a path will match all paths, but because Switch is used this will only be accessed if no other routes match.

```html
import { Switch } from "react-router-dom";

<Switch>
  <Route exact path="/" component="{HomePage}" />
  <Route path="/about" component="{AboutPage}" />
  <Route path="/courses" component="{CoursesPage}" />
  <Route component="{PageNotFound}" />
</Switch>
```

## Redirects

Used to change the url from code.\
We can use the parameters "from" and "to", taking the old url and the new url.

```JSX
import { Redirect } from "react-router-dom";

<Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/courses" component={CoursesPage} />
        <Redirect from="/about.page" to="about" />
        <Route component={PageNotFound} />
</Switch>
```

In this example users will be redirected to "about" imediatly if trying to access "about-page". To prevent this, and only redirecting after an action use a state to decide when to activate it.

## Prompt

Warns the user that they are navigating away from the component.\
The component takes two props: when and message. Message can contain a string or a function.

```JSX
import { Prompt } from "react-router-dom";

const ManageCoursePage = props => {
    return(
        <>
            <h2> Manage courses </h2>
            <Prompt when={true} message="Are you sure you want to leave the page?"/>
        </h2>
    )
}
```
