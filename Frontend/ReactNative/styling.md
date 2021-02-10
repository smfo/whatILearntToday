
# Styling

We can use the style prop to change the visual appearance of each component. This can be done using
a styling component from StyleSheet.

```Javascript
render() {
        let display = this.state.isLoggedIn ? "Sample user" : this.props.message;

        return (
            <View style={styles.headStyle}>
                <Text style={styles.headText} onPress={this.toggleUser}>{display}</Text>
            </View>
        )
    }

const styles = StyleSheet.create({
    headText: {
        textAlign: 'right',
        color: '#ffffff',
        fontSize: 20
    },
    headStyle: {
        paddingTop: 30,
        paddingBottom: 10,
        paddingRight: 10,
        backgroundColor: '#35605a'
    }
})
```

It's also possible to have multiple styles objects.
```javascript
const styles = StyleSheet.create({
    headText: {
        textAlign: 'right',
        color: '#ffffff',
        fontSize: 20
    }
})

const styles2 = StyleSheet.create({
    
    headStyle: {
        paddingTop: 30,
        paddingBottom: 10,
        paddingRight: 10,
        backgroundColor: '#35605a'
    }
})
```

## Flex
Used to define component sizes relative to eachother. A component of flex 2 will be twize the
size as a component of flex 1. Flex can also be negative.\
It is based on flexbox, and the default placement is set to column.\
https://reactnative.dev/docs/flexbox

To add flex to child components, the parent element has to have a given size.
```Javascript
export class Home extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Header message ="Press to login"/>
                <Text style={{flex:8}}>Open up App.js to start working on your app!</Text>
                <Text style={{flex:6}}>Open up App.js to start working on your app!</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
```