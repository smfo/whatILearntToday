
# Navigation

Done with a npm package `npm install @react-navigation/native`.\
https://reactnavigation.org/docs/getting-started\
In the root component for the navigation, add the StackNavigator.

Screen: the page/component to display on this navigation.
NavigationOptions: each screen can specify some options for the navigator, ex the title to render in the header

```javascript
import { StackNavigator } frm 'react-navigation';

// componentNavigationKey: {
//     screen: componentName,
//     navigationOptions: () => ({
//     })
// }

export default StackNavigator({
    list: {
        screen: EventList,
        navigationOptions: () => ({
            title: 'Navigation title component 1'
        })
    },
    form: {
        screen: EventForm,
        navigationOptions: () => ({
            title: 'Navigation title component 2'
        })
    },
});
```

Components that occure in this list get a prop called navigation. Use this prop to navigate to the deciered component.

```javascript
//From the EventList component

handleAddEvent = () => {
    this.props.navigation.navigate('form')
}
```