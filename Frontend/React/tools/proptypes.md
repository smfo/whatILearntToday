# PropTypes

`npm install --save prop-types`

Documents data and functions that are passed to the component via props.\
Specify the data type and require certain props.

Types: array, bool, func, number, object, string.

```JS
//in component CoursePage
import PropTypes from "prop-types";

CoursePage.propTypes = {
    author: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    errors: PropTypes.object,
    hasErrors: PropTypes.func.isRequired,
    courses: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired
    })).isRequired
};
```

NB: only run during development.

## DefaultProps

Set a default for required props to avoid errors.

```JS
CoursePage.defaultProps = {
    author: ""
}
```
