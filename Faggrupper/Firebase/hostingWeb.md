# Deploy and create firebase project

How to create and deploy a firebase project.

## Setup

* Install firebase
* Init project

```
npm install -g firebase-tools
firebase login
firebase init
```

After running firebase init, choose settings as you like. These can be changed later.

You can write `firebase projects:list` to get information about your project. The config will  be in the `.firebaserc` file.

## Deploy
```js
// Deploys the hosting content and config to your subdomain
npm run build
firebase deploy --only hosting

firebase deploy --only functions
```