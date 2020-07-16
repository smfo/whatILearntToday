
# Platform specific code

```Javascript
import {Platform} from 'react-native';

const styles = StyleSheet.create({
    headText: {
        textAlign: 'right',
        color: '#ffffff',
        fontSize: 20
    },
    headStyle: {
        paddingTop: 30,
        paddingRight: 10,
        backgroundColor: Platform.OS === 'android' ? '#35605a' : 'red',
        flex: 1
    }
})
```

## Platform specific components
Name the component file with ios og android.\
`Home.ios.js`\
`Home.android.js`

Import the component as usual and the appropriate component will be chosen.