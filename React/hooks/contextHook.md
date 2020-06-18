
# useContext

Makes it easy to access content within any component.

**Context**
Create a way to pass data through the components in the tree without
having to pass props down every level manually.

```javascript
export const ConfigContext = React.createContext();

const configValue = {
    showSpeakerSpeakingDays: true,
    showSignMeUp: false
};

const App = ({pageName}) => {
    return (
        <ConfigContext.Provider value={configValue}>
            <div>{pageName}</div>
        </ConfigContext.Provider>
    )
};

export default App;
```
Any component under App in the component tree will be able to access
the provided context.

To use the context in a lower component:
```javascript
import {useContext} from "react";

import {ConfigContext} from "./App";

const context = useContext(ConfigContext);
```
Now the values in the context can be accessed like so:
```javascript
context.showSpeakerSpeakingDays;
context.showSignMeUp;
```

When the values in the context is updated, so if the values in the 
lower components.