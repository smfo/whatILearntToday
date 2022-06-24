# Flutter with Firebase

[Mobile setup for Firebase](../../Faggrupper/Firebase/mobileSetup.md)

## Packages
Add these packages to the `pubspec.yaml` dependencies.

[firebase_auth: ^3.3.9](https://pub.dev/packages/firebase_auth/install)\
[cloud_firestore: ^3.1.10](https://pub.dev/packages/cloud_firestore/install)\
[provider: ^6.0.2](https://pub.dev/packages/provider/install)

## Initialize

Install flutterfire: `dart pub global activate flutterfire_cli`
and add the path to system variables `C:\Users\*username*\AppData\Local\Pub\Cache\bin`.

Navigate to the project in the flutter terminal, `flutterfire configure` and follow the instructions. This will create a firebase_options.dart file in the project.\
We use this to initialize the app when running the main startup method.


https://firebase.flutter.dev/docs/overview/#get-to-know-firebase-for-flutter

Initialize firebase when the project starts my adding this to the main file.
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

## Fix build errors

In `android/app/build.gradle` under `android -> defaultConfig`, set `minSdkVersion` to at least 21. Or, if you want to support Android versions down to 19, set it to 19 and add `multiDexEnabled true` to the same defaultConfig.

### FlutterFire

 FlutterFire is a set of Flutter plugins that enable Flutter apps to use Firebase services.