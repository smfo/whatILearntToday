# Flutter flavors

A flavor is essentially a version of your app.\
You might need different flavors for different environments, they might have specific db urls, accesstokens etc. A flavor can also represent a slightly different version of your app, like a paid/free version.

This file will talk about how to use flavors to set up different config in the application. There is another on how to connect flavors to [multiple firebase projects](\Firebase\environments.md) and look into launch.json for VSCode as well.

**Build mode in Flutter**\
In Flutter there are three build modes, depending on what the user want to use the application for.\
Debug: can be run on emulator. It is a larger final package and is optimized for development. `flutter run`\
Profile: can only be run on physical devices to maintain real perfornamce, it has some debug functionality. `flutter run --profile`\
Release: can only be run on physical devices, this mode is used for the package published to the store. `flutter run --release` or `flutter build`.

**Flavor vs build mode**\
You can query which build mode your app is running in and provide different variables depending on this. However you cannot change the firebase project youre connected to, your app icon etc.

## Set up config

We can create a config object that contains flavor specifiv variables we need to access throughout the app.


```dart
enum Flavor {
  dev,
  prod
}

class FlavorConfig {
  static String appName ="";
  static Flavor flavor = Flavor.dev;
  static String collection = "";

  FlavorConfig();

  static String get collectionName {return collection;}
  static String get name {return appName;}
  static bool isProduction() => flavor == Flavor.prod;
  static bool isDevelopment() => flavor == Flavor.dev;
}
```

We then need to create a main file for each flavor. Here we will define the flavor for the file and set up the config.

```dart
void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    name: "prod",
    options: DefaultFirebaseOptions.currentPlatform,
  );

  FlavorConfig.collection = "events";
  FlavorConfig.appName = "production";
  FlavorConfig.flavor = Flavor.prod;

  runApp(const MyApp());
}
```

Becaus of the config setup, we can now access the flavor instance anywhere in the application

```dart
class EventService {
  final CollectionReference eventCollection =
      FirebaseFirestore.instance.collection(FlavorConfig.collectionName);
```
