# Socket.io with React/Redux

## Light implementation

Use this if the websocket is not used that much and listeners are only used in specific components. Create the connection to the socket as a singleton in the root component and use this to listen to messages that are only relevant to that particular component later on.

```js
import { socket } from "socketUtil.js";
import { useDispatch } from "react-redux";

function ChatRoomComponent() {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("event://get-message", (payload) => {
      // update messages
      useDispatch({ type: UPDATE_CHAT_LOG }, payload);
    });
    socket.on("event://user-joined", (payload) => {
      // handling a new user joining to room
    });
  });

  // other implementations
}
```

## Implement for entire project

However, if listeners need to be available in multiple components this will quickly turn into a mess and we will get duplicate code. So the socket functions will be kept globaly in a context, this is essentially the client. Read React-hooks-contextHook for details on this.

By importing `useDispatch()` the listeners can also call actions after reciving events. This is available to the WebSocket because the context is placed inside the Redux store provider (see bottom of first example).

To be able to call the emit function from other components they need to be placed inside normal functions that the components can call. This is not necessary for the listeners, however they need tp be placed after a if(socket). The socket itself is only created once, so it will be a singleton, and not create new instances every time the file is reloaded.

```js
// WebSocket.js
import React, { createContext } from "react";
import io from "socket.io-client";
import { WS_BASE } from "./config";
import { useDispatch } from "react-redux";
import { updateChatLog } from "./actions";

//export context
const WebSocketContext = createContext(null);
export { WebSocketContext };

export default ({ children }) => {
  //setup socket functions

  let socket;
  let ws;

  const dispatch = useDispatch();

  // emit functions
  const sendMessage = (roomId, message) => {
    const payload = {
      roomId: roomId,
      data: message,
    };
    socket.emit("send-message", JSON.stringify(payload));
    dispatch(updateChatLog(payload));
  };

  const getRooms = () => {
    socket.emit("get-rooms");
  };

  const sendRooms = () => {
    socket.emit("send-rooms");
  };

  if (!socket) {
    //Creating the connection
    socket = io.connect(WS_BASE);

    // Listeners
    socket.on("get-message", (msg) => {
      const payload = JSON.parse(msg);
      dispatch(updateChatLog(payload));
    });

    ws = {
      socket: socket,
      sendMessage,
    };
  }

  //creating WebSocket provider
  return (
    <WebSocketContext.Provider value={ws}>{children}</WebSocketContext.Provider>
  );
};

//Websocket provider in root component
function App() {
  return (
    <Provider store={store}>
      <WebSocketProvider>
        <div className="App">
          <HomeComponent />
        </div>
      </WebSocketProvider>
    </Provider>
  );
}
```

Calling the socket functions from components require importing the context and saving it in a constant. Functions can then be accessed from this constant.

```JS
//Component
import React, { useState, useContext } from "react";
import "../App.css";
import { WebSocketContext } from "../WebSocket";
import { useSelector, useDispatch } from "react-redux";
import { setUsername } from "../Redux/actions/userActions";

function ChatRoom() {
  const [usernameInput, setUsernameInput] = useState("");
  const [msgInput, setMsgInput] = useState("");

  const room = useSelector((state) => state.room);
  const username = useSelector((state) => state.username);
  const chats = useSelector((state) => state.chatLog);

  const dispatch = useDispatch();

  //import the websocket
  const ws = useContext(WebSocketContext);

  const sendMessage = () => {
    //calling websocket function
    ws.sendMessage(room.id, {
      username: username,
      message: msgInput,
    });
  };

  //return(....)
```
