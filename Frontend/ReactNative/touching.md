
# Touch detaction

Use the `onPress` click event

* TouchableHighlight
* TouchableNativeFeedback
* TouchableWithoutFeedback
* TouchableOpacity

```Javascript
onPress = () => {
        Alert.alert('Tap');
    }

    render(){
        return(
        <View style={styles.container}>
            <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.buttonStyles} onPress={this.onPress}>
                    <Text style={styles.buttonText}>LESSONS</Text>
                </TouchableOpacity>
```