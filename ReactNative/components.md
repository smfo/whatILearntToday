
# React native components
https://reactnative.dev/docs/components-and-apis

## Images

Provide from remote sources or local files. The image dimensions must be supplied.

Import Image from react native and use the Image element with a source attribute spesifying
where to get the image.

```javascript
export class Hero extends React.Component{
    render(){
        return(
            <Image 
                style={styles.heroImage}
                source={require('./img/dog1.jpg')}
            />
        )
    }
}

const styles = StyleSheet.create({
    heroImage: {
        width: undefined,
        height: undefined,
        flex: 8
    }
})
```

## TextInput
The textinput component is used to collect user input.\
The most important props are onTextChanged

```javascript
<TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      onChangeText={text => onChangeText(text)}
      value={value}
    />
```

## FlatList
Flatlist takes an array of elements. The elements in data is itterates over 
and the logic in renderItem is applied to each of them seperatly.\
The FlatList component must contain either the data or renderItem props.

```javascript
<Flatlist
    data={data}
    renderItem={render function/component}
/>
```
