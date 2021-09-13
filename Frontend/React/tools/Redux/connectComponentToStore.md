# Connect

Wraps a component so it is connected to the Redux store. What state and what actions do you want to pass.

```JS
import { connect } from "react-redux";

export default connect(mapStateToProps, mapDispatchToProps)(ComponentName);
```

## Use an interface to only get some of the state values

mapStateToProps: which states should be exposed as props on the component. The component will subscribe to the redux store updates. Which states are available to this component.

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

## Access actions

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