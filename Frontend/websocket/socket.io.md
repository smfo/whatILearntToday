# Websocket

Displays real-time changes from a server to multiple clients without having to use http requests, the connection remains open.\
Direct two way connection between server and client. Once connected users can send and listen to other users connected to the server.

# Socket.io

## Setup

Install socket.io and other required modules,
`npm install --save socket.io`.

This is the app.js file setup using express and node. io.on('connection') is used to open the connection between the client and server. The socket argument is used every time the client sends or recives a message from the client.

```JS
var express = require("express");
var path = require("path");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);
var port = 8080;

app.use(express.static(path.join(__dirname, "public")));

//runs when connection client to server
//socket is used every time we want to send or recive messages
io.on("connection", function (socket) {
  console.log("new connection made");
});

server.listen(port, function () {
  console.log("Listenning to port " + port);
});
```

To initiate the connection to the client, the handshake, include the socket.io script and specify `io(serverlocation)` in the index.html file.

```html
<body>
  <script src="/socket.io/socket.io.js"></script>

  <script>
    var socket = io("http://localhost:8080");
  </script>
</body>
```

## Sending and reciving messages

Communication between client and server is done in the `connection`, for the server, and in the script from the client. Using `on` and `emit` to handle events.

```JS
//app.js (server side)

io.on("connection", function (socket) {
  console.log("new connection made");

  //emitting from server
  socket.emit('message-from-server', {
      greeting: 'Hello from Server'
  });

  //eventlistener on the event "message-from-client"
  socket.on('message-from-client', function(msg){
      console.log(msg);
  })
});


//index.html (client)
<script>
        var socket = io("http://localhost:8080")

//reciving the event 'message-from-server', and triggering the event 'message-from-client'
        socket.on('message-from-server', function(event){
            document.body.appendChild(
                //accessing the greeting value
                document.createTextNode(event.greeting)
            );

            socket.emit("message-from-client", {
                greeting: 'Hello from Client'
            });
        });

    </script>
```

**On**\
When listening to events we need to include a event name and a function that says how to handle the data recived from that event.

```
socket.on(event-name, function(args){do something})
```

**Emit**\
When emitting an event, we include the name of the event being emitted and an object containing the message we want to send to the client/server.

```
socket.emit(event-name, {field: value})
```

**Ticker**\
Typical event name used for events that are reemitted at an interval.

### pub/sub pattern

The publisher emits an event that are distributed to all the subscribers. The publisher does not need to know who the subscribers are, creating a loosely coupled connection between them.

### Socket. vs io.

Each connection between a client and a server creates a socket instance. We can add values to it or get the current values using `socket.newField = field value` and `socket`, to access the entire instance. (See client-server-client for example)

`socket.no` and `socket.emit` only responds to the client that is interactiong with the server, whereas `io.emit` emits the event to all clients that has a connection to the server, adn `io.on` listens to everything.

## Client-server-client

### io.emit()

Example, list the names of all users in a chat.

The 'join' listener in the server gets triggered when one of the clients emits a 'join' event. In the handeling of that event, the server uses a io emit to emit an event to all the clients.

```JS
// server
var users = [];

io.on("connection", function (socket) {
  console.log("new connection made");

    //client triggers a join event
  socket.on("join", function (data) {
    console.log("join data", data);
    console.log("existing users", users);
    //give the socket instance a field nickname and set value
    socket.nickname = data.nickname;
    // for users[sockername] set equal to socket (all socket information)
    users[socket.nickname] = socket;

    var userObj = {
      nickname: data.nickname,
      socketid: socket.id,
    };
    users.push(userObj); //add object to global users array

    //using io to emit to all subscribers
    io.emit("all-users", users);
  });
});
```

```js
//client

//creating connection to server
socket.emit("join", {
  nickname: nickname,
});

//listening for 'all-users' event
socket.on("all-users", function (data) {
  console.log(data);
  //handle data
  $scope.users = data.filter(function (item) {
    return item.nickname !== nickName;
  });
});
```

**Problem**\
The 'all-users' event is fiering before it can be registered in the new client. So th username list will be updated for all already existing users, but not the user just joining the chat.

This can be solved by the new client calling the server and requesting the same information the other clients got on the `io.emit` event.

```JS
//client
socket.emit('get-users');

socket.on('all-users', function(data){...})

//server
socket.on("get-users", function () {
    socket.emit("all-users", users);
  });

```

Because the emit events from the server are called the same, the client will handle the data as if the event were emitted to all clients.

### socket.brodcast.emit()

Socket.broadcast.emit() emits an event to all clients except for the one the server is currently interacting with.

Example: sending a message to everyone in the shared chat.

```JS
//server
socket.on('send-message', function(data){
    socket.broadcast.emit('message-recived', data);
  })

//client
socket.emit("send-message", newMessage);

socket.on('message-recived', function(data){
    $scope.messages.push(data);
})

```

**Broascast to specific client**\
It is possible to broadcast to only one specific client. This means that the client interacting with the server emits an event to one other specific client.

```
socket.broadcast.to(other socket id).emit(eventName, object)
```

Example:

```JS
//client
socket.on("user-liked", function (data) {
      console.log(data);
      $scope.likes.push(data.from);
    });

//user contains the other clients id
$scope.sendLike = function (user) {
      console.log(user);
      var id = lodash.get(user, "socketid");
      var likeObj = {
        from: nickName,
        like: id,
      };
      socket.emit("send-like", likeObj);
    };


//server
socket.on("send-like", function (data) {
    console.log(data);
    socket.broadcast.to(data.like).emit("user-liked", data);
  });

```

## Disconnect

As well as 'connection', there is also a built in event 'disconnect'. By listening to this event in the server, necessary changes can be made if a client disconnects from the server.

```JS
socket.on('disconnect', function(){

    //handle disconnection
    users = users.filter(function(item){
      return item.nickname !== socket.nickname;
    });
    io.emit('all-users', users);
  })
```

## Private broadcasts

As well broadcasting to one specific client, it is possible to broadcast only to a group of clients by joining a named channel.

This is done by using the `.join(channel name)` keyword

### Join broadcast

```js
//client
$scope.joinPrivate = function () {
  socket.emit("join-private", {
    nickname: nickName,
  });
  console.log("private room joined");
};

//server
socket.on("join-private", function (data) {
  socket.join("private"); //joining (and possibly creating) channel
  console.log(data.nickname);
});
```

### Events in broadcast

Sending events to a broadcast is done by using the broadcast name instead of a socket id, `broadcast.to(channel name)`.

```js
//client
$scope.groupPm = function () {
  socket.emit("private-chat", {
    message: "hello everyone",
  });
};

socket.on("show-message", function (data) {
  console.log(data);
});

//server
socket.on("private-chat", function (data) {
  socket.broadcast.to("private").emit("show-message", data.message);
});
```

NB: clients that have not joined a channel can still emit events to it, as long as they have access to the channel name.

Leave a channel using `.leave()`.
