# Create your own ticker

A ticker is usually a websocket event that emits values at an interval.

It is possible to create a ticker from a REST api by creating a function that calls the REST api and emits the result at an interval.

The easiest example is by calling a default value that changes with every request, like time.

```js
//server
io.on('connection', function(socket) => {

    setInterval(() => {
    let time = new Date();

    let clock = {};
    clock.hour = time.getHours();
    clock.minut = time.getMinutes();
    clock.second = time.getSeconds();
    socket.emit("clock", clock);
  }, 1000);
});

//handle the emitted event
socket.on('clock', data => {
    console.log(data);
})
```

## From REST api

For a bit more complex example, but the consept is still the same, just make sure to add a catch and await the result.

```js
//server
io.on("connection", (socket) => {
  setInterval(async () => {
    socket.emit(
      "subscribed-btc-prices",
      await fetch.pushUpdates().catch((err) => {
        console.log(err);
      })
    );
  }, 5000);
});

//service calling rest api
exports.pushUpdates = function () {
  return new Promise(function (resolve, reject) {
    let btcArr = [];
    fetchApi("https://api.cryptonator.com/api/ticker/btc-usd").then(function (
      res
    ) {
      btcArr.push(JSON.parse(res).ticker);
      resolve(btcArr);
    });
  });
};

//client
socket.on("subscribed-btc-prices", (tickerdata) => {
  //do something
});
```
