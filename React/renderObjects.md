
# Rendering objects

You can't just pass an object as a value and render it, much like
with arrays.

Whereas arrays are rendered by using map directly on them
```javascript
render(){
    const numberList = [1,2,3,4,5];

    const displayNumbers = numberList.map(number => {
        return <div key={number}>{number}</div>
    })

    return(
        <div>
            {displayNumbers}
            {numberList.map(number => { return <div>{number}</div>})}
        </div>
    )
}
```
This is not possible with objects as they have no list of elements to itterate over.
We solve that by giving each value on the object the name as a key.

Here `this.state.data` is an object. Key is the name of each value and the actual 
value can be acessed by using this.state.data[key].
```javascript
render(){
    const displayData = Object.keys(this.state.data).map((key, value) => 
        <div key={key}>{key}: {this.state.data[key]}</div>
    )

    
    return(
        <div>
            {Object.keys(this.state.data).map((key, i) => <div key={key}>{key}: {this.state.data[key]}</div>)}
            {displayData}
        </div>
    )
}
```
Each method can be done inline or be saved as a variable, as demonstrated.

It is also possible to only collect the values themselves, by using Object.values(objectName).
```javascript
formatData(data) {
    data.map(day => {
        const values = Object.values(day);
        this.state.tested.push(values[1]);
        this.state.deaths.push(values[2]);
    });
    console.log(this.state);
}

getData = async () => {
    const body = { alpha2Code: "NO" }
    try {
        const request = await axios.post(`https://covid19-us-api.herokuapp.com/country`, body);
        this.formatData(request.data.message);
    }
    catch (err) {
        console.log('invalid', err)
    }
}
```
This example collects two values from each object from an array of objects.