# Provider

A statemanagement package.

Can only be used with flutter widgets, needs a context. It is a lot more limitet than other state management options, but also quite simple.

```
flutter pub add provider
```

You need to

* Create a provider
```dart
class DayId with ChangeNotifier {
  String _id = "";

  String get id => _id;

  void updateDayId(String newId){
    _id = newId;
  }
}
```

* Declare all your providers in th emain function
```dart
void main() {
  runApp(
    /// Providers are above [MyApp] instead of inside it, so that tests
    /// can use [MyApp] while mocking the providers
    MultiProvider(providers: [
    ChangeNotifierProvider(create: (_) => DayId()),
  ], child: const MyApp());
  );
}
```

* Update provider
```dart
context.read<DayId>().updateDayId(dayId);
```

* Watch provider for changes
```dart
context.watch<DayId>().id;
```