
## Reactjs-popup
Reactjs-popup is a library that provides modals, tooltips, menues and more
Installation: ```npm install reactjs-popup --save```
Information: https://www.npmjs.com/package/reactjs-popup
Documentation: https://react-popup.elazizi.com/ 

```javascript
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

    return (
        <div>
            <Popup trigger={<button> Trigger</button>} position="right center" modal> //for popup remove modal keyword
                <div>Popup content here !!</div>
            </Popup>
        </div>
```