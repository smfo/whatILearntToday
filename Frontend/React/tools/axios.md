
# Axios

Axios is a promise based HTTP client used to make requests to external servers
from the browser and Node.js.

`npm install axios`

ES2015: `import axios from 'axios'`
Node.js: `const axios = require('axios')`

### Calls
get, delete, head and options have two arguments: the URL and an optional config object\
`axios.get('products/5');`

post, put and patch take a data object as the second argument, and the optinal config object as their third\
```javascript
axios.post(
    '/products',
    { name: 'Waffle Iron', price: 21.50 },
    { options }
);
```

Axios returns a promise that resolves in a response object or an error.
```javascript
axios.get('/product/9')
  .then(response => console.log(response))
  .catch(error => console.log(error));
```
Alternativly
```javascript
try{
axios.get('/product/9')
}
catch (err){
    console.log(err)
}
```

### Simultanious calls
Instead of creating multiple async calls and making two requests, 
it is possible to use the axios.all() function

```javascript
    getUserData = async () => {
        try {
            const {data} = await axios.get(`${ROOT_URL}/profile/${this.props.activeUserId}`);
            return data;
        } catch (err) {
            console.log(err.message);
        }
    }

    getPermissions = async () => {
        try {
            const {data} = await axios.get(`${ROOT_URL}/permissions/${this.props.activeUserId}`);
            return data;    
        } catch (err) {
            console.log(err.message);
        }   
    }

    async componentDidMount() {
        //making two calls
        const userData = await this.getUserData();
        const userPermissions = await this.getPermissions();
        this.setState(
            user: {
                data: userData,
                permissions: userPermissions
            }
        );
    }
```
Axios.all() accepts an array of axios requests and returns an array containing the responses from each request.
The same functionality using axios.all()
```javascript
    getUserData = () => axios.get(`${ROOT_URL}/profile/${this.props.activeUserId}`);

    getPermissions = () => axios.get(`${ROOT_URL}/permissions/${this.props.activeUserId}`);

    async componentDidMount() {
        try {
            //calling all the requests in the same try/catch
            const [userData, userPermissions] = await axios.all([ this.getUserData(), this.getPermissions() ]);
            this.setState(
                user: {
                    data: userData.data,
                    permissions: userPermissions.data
                }
            );
        }
        catch (err) {
            console.log(err.message);
        }
        
    }
```
The problem is that if one of the requests fail, all the other requests fail as well.\
This can be solved by returning null from all catch() blocks, even if one of the requests fail axios.all() will be resolved.
```javascript
    getUserData = () => axios.get(`${ROOT_URL}/profile/${this.props.activeUserId}`).catch(err => null);

    getPermissions = () => axios.get(`${ROOT_URL}/permissions/${this.props.activeUserId}`).catch(err => null);

    async componentDidMount() {
        try {
            const [userData, userPermissions] = await axios.all([ this.getUserData(), this.getPermissions() ]);
            this.setState(
                user: {
                    data: userData && userData.data,
                    permissions: userPermissions && userPermissions.data
                }
            );
        }
        catch (err) {
            console.log(err.message);
        }
    }
```

The call can be shortener even future
```javascript
async componentDidMount() {
        const URLs = [ `${ROOT_URL}/profile/${this.props.activeUserId}`, `${ROOT_URL}/permissions/${this.props.activeUserId}` ];
        
        const requests = URLs.map(URL => axios.get(URL).catch(err => null));

        try {
            const [userData, userPermissions] = await axios.all(requests);
            this.setState(
                user: {
                    data: userData && userData.data,
                    permissions: userPermissions && userPermissions.data
                }
            );
        }
        catch (err) {
            console.log(err.message);
        }
    }
```