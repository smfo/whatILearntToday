# State handling

States in Flutter are handled using Streams. There are a couple of different widgets that help us with this.

## Snapshot

A snapshot contains the result of a Future or Stream we are listening to. In order to access the actual values of the data provided we need to go via the snapshot.

```dart
 FutureBuilder(
     future: someFutureFunction(),
       // Here you told Flutter to use the word "snapshot"
     builder: (context, snapshot) { 
     if (snapshot.connectionState == ConnectionState.waiting)
         return Center(child: CircularProgressIndicator());
     else
         return Text(counter.toString());
})
```

## StreamProvider
The provider package is used to listen to streams, ex. snapshots from Firestore.\
Widgets are wrapped in a provider to give all of their child components access to the stream.

The Index widget, and all child widgets, now have access to the stream providing `BookUser` objects from the `AuthService().user` method.

```dart
Widget build(BuildContext context) {
    // Wrap the widget in the StreamProvier and specify which type of object we will recive through the stream
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

### InitialData

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

## StreamBuilder

If you know you will only use the stream in the component you set it up, a `StreamBuilder` is a nice alternative. This comes with Flutter, not Provider like StreamProvider, and it's only job is to rebuild itself whenever the stream it listens to is updated.

```dart
class _MyHomePageState extends State<MyHomePage> {
  @override
  Widget build(BuildContext context) {
    return StreamBuilder( 
      stream: FirebaseAuth.instance.userChanges(),
      initialData: null,
      builder: (context, snapshot){
        if(snapshot.hasData){
          return const BooksScreen();
        } else {
          return const LoginScreen();
        }
      }
    );
  }
}
```

## FutureBuilder

Listens to a Future.

## MultiProvider

If you want to have more than one stream in the widget, use `MultiProvider`.