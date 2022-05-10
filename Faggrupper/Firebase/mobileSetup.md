# Setup Firebase with mobile (Flutter & Android)

* In the console create a android app. Make sure to give it the same id (package name) that you find in `android/app/build.gradle`

* Download the config file and place it in `android/app`. This file will tell the project which Firebase backend to connect to when it is run

* In `android/build.gradle` add the `classpath 'com.google.gms:google-services:n.n.n'` dependency the console gives you

* In `android/app/build.gradle` add `apply plugin: 'com.google.gms.google-services'`

Now check if the project [runs](./../../Mobile/Flutter/VSCode.md#run-emilator)

## Initialize

Install flutterfire `dart pub global activate flutterfire_cli`
and add the path to system variables `C:\Users\*username*\AppData\Local\Pub\Cache\bin`.\
Navigate to the project in the flutter terminal and configure `flutterfire configure`. This will create a firebase_options.dart file in the project.\
We use this to initialize the app when running the main startup method.


https://firebase.flutter.dev/docs/overview/#get-to-know-firebase-for-flutter
```dart
import 'package:firebase_core/firebase_core.dart';
import 'firebase_options.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
  runApp(MyApp());
}
```

### FlutterFire

 FlutterFire is a set of Flutter plugins that enable Flutter apps to use Firebase services.