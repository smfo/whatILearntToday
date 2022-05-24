# State handeling

The provider package is used to listen to streams, ex. snapshots from Firestore.\
Widgets are wrapped in a provider to give all of their child components access to the stream.

The Index widget, and all child widgets, now have access to the stream providing `BookUser` objects from the `AuthService().user` method.

```dart
Widget build(BuildContext context) {
    // Wrap the widget un the StreamProvier and specify which type we will recive through the stream
    return StreamProvider<BookUser>.value(
      // The stream we want to listen to
      value: AuthService().user,
      // The initial value of the stream
      initialData: BookUser(uid: "1"),
      child: MaterialApp(
        home: const Index(),
      ),
    );
  }
```

Access the provider in a widget future down the three.

```dart
class Index extends StatelessWidget {
  @override
  Widget build(BuildContext context) {

    // Access the provider value
    final user = Provider.of<BookUser>(context);
    return Authenticate();
  }
}
```

## InitialData

There are two required parameters to a StreamProvider, `value` and `initialData`. If there is not good initial data option, simply set the datatype to recive, `StreamProvider<recivedType>` to optional and the initial data will accept `null`.

```dart
Widget build(BuildContext context) {
    return StreamProvider<BookUser?>.value(
      value: AuthService().user,
      initialData: null,
      child: MaterialApp(
        home: const Index(),
      ),
    );
  }
```