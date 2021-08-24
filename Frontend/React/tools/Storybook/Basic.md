# Storybook

Storybook is a tool developers can use to catalog and document components.\
All components are displayed in a folder system where it is possible to change props and styling.

## Installation
Add storybook to existing project:

```js
npx sb init

// Run storybook
npm run storybook
```

## Configure
* Create a folder in the root called .storybook
* Create main.js inside with
```js
// Define that a story is a file with the extension ".stories.tsx" inside the src folder

module.exports = {
     stories: ['../src/**/*.stories.tsx']
};
```
* Add a script to run Storybook to package.json
```js
"scripts": {
     "start": "react-scripts start",
     "build": "react-scripts build",
     "test": "react-scripts test",
     "eject": "react-scripts eject",
     "storybook": "start-storybook"
},
```

Addons and cusomt webpack configs are also defined in main.js