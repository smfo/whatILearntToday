
# useContext

Makes it easy to access content within any component, creating global variables for a tree of components.
Primarily used when data needs to be accessible in many componentsat different nesting levels.

**Context**
Create a way to pass data through the components in the tree without
having to pass props down every level manually.

Create a configuration that contains the variables, either in a seperat file or a already existing component.
```javascript
export const contextName = React.createContext();

//can be defined outside or inside function/class
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
import {useContext} from "react";

import {contextName} from "./App";

const context = useContext(contextName);
```
Now the values in the context can be accessed like so:
```javascript
context.showSpeakerSpeakingDays;
context.showSignMeUp;
```

When the values in the context is updated, so is the values in the 
lower components.

**With useEffect**
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

## State variables