# useContext

Makes it easy to access content within any component, creating global variables for a tree of components.
Primarily used when data needs to be accessible in many components at different nesting levels.

**Context**\
Create a way to pass data through the components in the tree without
having to pass props down every level manually.

Create a configuration that contains the variables, either in a seperat file or a already existing component.

```javascript
export const contextName = React.createContext();

//The values that will be available using the context
const contextContent = {
    showSpeakerSpeakingDays: true,
    showSignMeUp: false
};

function App()
{
    return (
        <contextName.Provider value={contextContent}>
            Component content
        </contextName.Provider>
    )
}
};

export default App;
```

Any component under App in the component tree will be able to access
the provided context.

To use the context in a lower component:

```javascript
import { useContext } from "react";

import { contextName } from "./App";

const context = useContext(contextName);
```

Now the values in the context can be accessed like so:

```javascript
context.showSpeakerSpeakingDays;
context.showSignMeUp;
```

When the values in the context is updated, so is the values in the
lower components.

**With useEffect**\
To run useEffect again, in any lower component using the context, deconstruct the context object
and use that as the run condition for useEffect

```C#
const context = useContext(UserContext);

React.useEffect(() => {
        GetCompareUserNames(context).then(data => {
            setCompareUser(data);
            setCurrentUser(context);
        });
    }, [...Object.values(context)])
```

## Seperate file

If needing to pass a lot of values or we want global functions to be available, it might be easier to create a seperat file to hold the context.

The component renders the children that are passed in from the file. The file will provide the context provider, so instead of wrapping the entire application in this, we instead only need ti wrap it in the context component.

```js
export const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const {
    isLoading,
    speakerList,
    toggleSpeakerFavorite,
  } = useSpeakerDataManager();

  const someFunction = () => {};

  const provider = {
    isLoading,
    speakerList,
    toggleSpeakerFavorite,
    someFunction,
  };

  return (
    <GlobalContext.Provider value={provider}>{children}</GlobalContext.Provider>
  );
};

//App.js
import GlobalProvider from ".GlobalProvider";

function App() {
  return <GlobalProvider>// the rest of the application</GlobalProvider>;
}
```

To use the values and functions in other components import the context directly from the file, instead of from App.js, and use as before.

See websocket-redux (Implement for entire project) for a more complex example.
