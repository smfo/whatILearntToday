# Async in widgets

A build method in a widget will not wait for you to fetch data before building, so how to get values from async functions?

We use FutureBuilder.\
It takes an argument future, which is the method we want to call that returns a Future value, and a builder. The builder will be called when the widget is initialized and again when the future resolves with data or an error

```dart
class MyWidget extends StatelessWidget {
  @override
  Widget build(context) {
    return FutureBuilder<String>(
      future: callAsyncFetch(),
      builder: (context, AsyncSnapshot<String> snapshot) {
        if (snapshot.hasData) {
          return Text(snapshot.data);
        } else {
          return CircularProgressIndicator();
        }
      }
    );
  }
}
```

https://stackoverflow.com/questions/50844519/flutter-streambuilder-vs-futurebuilder