# Firebase emulator with Flutter

After [creating an emulator in the project folder](../../../Faggrupper/Firebase/emulator.md) we need to setup the flutter emulator to use this instead of firebare.

In the main.dart file

```dart
// Use emulator
const bool useEmulator = true;

void main() async {
  // Initialize firebase as usial
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );

  // Add use emulator
  if (useEmulator) {
    await _connectToFirebareEmulator();
  }

  ...

  runApp(const ProviderScope(child: MyApp()));
}

// Add emulator code
Future _connectToFirebareEmulator() async {
  var localhostString = "localhost";
 
 if (defaultTargetPlatform == TargetPlatform.android) {
    // Some android/ios specific code
    localhostString = Platform.isAndroid ? "10.0.2.2" : "localhost";
  }

  FirebaseFirestore.instance.settings = Settings(
      host: '$localhostString:8080',
      sslEnabled: false,
      persistenceEnabled: true);

  await FirebaseAuth.instance.useEmulator('http://$localhostString:9099');
}
```

The port strings are visible in the command window after starting the emulator.

Alternativly this can be set directly on the `FirebaseFirestore.instance`