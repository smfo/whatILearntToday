# State handeling

The provider package is used to listen to streams. Widgets are wrapped in the provider to give them access to the stream.

The Index widget, and all child widgets, now have access to the stream providing `BookUser` objects from the `AuthService().user` method.
```dart
Widget build(BuildContext context) {
    return StreamProvider<BookUser>.value(
      value: AuthService().user,
      initialData: BookUser(uid: "1"),
      child: MaterialApp(
        home: const Index(),
      ),
    );
  }
```

Access the provicer in a widget.

```dart
class Index extends StatelessWidget {
  @override
  Widget build(BuildContext context) {

    final user = Provider.of<BookUser>(context);
    return Authenticate();
  }
}
```