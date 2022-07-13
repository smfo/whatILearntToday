# Flutter flavors

A flavor is essentially a version of your app.\
You might need different flavors for different environments, they might have specific db urls, accesstokens etc. A flavor can also represent a slightly different version of your app, like a paid/free version.

This file will talk about how to use flavors to set up different config in the application. There is another on how to connect flavors to different firebase project and look into launcj.json as well.

**Build mode in Flutter**\
In Flutter there are three build modes, depending on what the user want to use the application for.\
Debug: can be run on emulator. It is a larger final package and is optimized for development. `flutter run`\
Profile: can only be run on physical devices to maintain real perfornamce, it has some debug functionality. `flutter run --profile`\
Release: can only be run on physical devices, this mode is used for the package published to the store. `flutter run --release` or `flutter build`.

**Flavor vs build mode**\
You can query which build mode your app is running in and provide different variables depending on this. However you cannot change the firebase project youre connected to, your app icon etc.

## Set up config

Config object and setup

We then need to create a main file for each flavor. Here we will define the flavor for the file and set up the config.

```dart
void main() {
  FlavorConfig(flavor: Flavor.QA,
      color: Colors.deepPurpleAccent,
      values: FlavorValues(baseUrl: "https://raw.githubusercontent.com/JHBitencourt/ready_to_go/master/lib/json/person_qa.json"));
  runApp(MyApp());
}
```

Becaus of the config setup, we can now access the flavor instance anywhere in the application

```dart
class HomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Flutter Ready to Go')),
      body: Center(child: Text("Flavor: ${FlavorConfig.instance.name}")),
    );
  }
}
```

Add banner to nice to have?
