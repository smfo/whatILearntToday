
# Http requests

**Fetch**\
Standard API for networking needs. Bundeled in react native.\

The API is promisse based, so we need to call .then when working with the responses.
```javascript
fetch('http://server.com/events')
    .then((response) => response.json())
    .then((responseJson) => {
        return responseJson.events;
    })
    .catch((error) => {
        console.error(error);
    });
```
**Then** is not like tap. Any changes done to the observable will be passed on to the next .then 
or whatever uses the fetch values. This also applies to console.log!

Other XHR based libraries can also be used, like Axio.

## Get data
Basic get function.
```javascript
const url = 'http://localhost:3000/events';

export function getEvents() {
    return fetch(url)
        .then(response => response.json())
        .then(events => event.map(e => ({...e, date: new Date(e.date)})));
}
```

Use getEvents in other component:
```javascript
import { getEvents } from './api';

getEvents().then(events => this.setState({ events }));
```

## Post data
```javascript
export function saveEvent({ title, date }){
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            title,
            date,
            id: uuid(), //import if wanted
        }),
        headers: new Headers({
            'Content-Type': 'application/json',
        })
    })
    .then(res => res.json())
    .catch(err => console.error(err));
}
```

This will successfully save to the api, but getEvents also needs to load the updated data
in order to update the view.

```javascript
componentDidMount(){
    this.props.navigation.addListener('methodToSubscribeTo', () => {
        getEvent...
    })
}
```

## Access localhost from test device
Localhost urls will not work on physical test devices (or simulators?) if the server is running on the computer

```javascript
import Constants from 'expo-constants';

const { manifest } = Constants;
// if the program is in development environment, get the url for the computer (instead of localhost). This is the manifest.debuggerHost
const api = manifest.packagerOpts.dev
    ? manifest.debuggerHost.split(':').shift().concat(':3000')
    : 'productionurl.com';

const url = `http://${api}/events`;
```