# Support multiple firebase project

We want to connect each flutter flavor in the application to it's own Firebase project.\
This will enable us to use seperate databases, test users, authentication rules etc. for the different environments we want to set up.

## Android configuration

In order for our flutter application to know which values to use for the different flavors, we need to add a configuration to the android block in `android\app\build.gradle`.

We add the productFlavors we want. Required fields are dimensions, that tells the application which flacorDimensions the flavor belongs to, and applicationId or applicationIdSuffix. Any fields that are not specified will fall back on defaultConfig.

```gradle
android {
    ...

    defaultConfig {
        applicationId "com.example.kliss"
        ...
    }

    flavorDimensions "env"
    productFlavors {
        production {
            applicationId "com.example.kliss"
            <!-- applicationIdSuffix "" -->
            resValue "string", "app_name", "Flavor prod"
            dimension "env"
        }
        development {
            applicationId "com.example.kliss.dev"
            <!-- applicationIdSuffix ".dev" -->
            resValue "string", "app_name", "Flavor dev"
            dimension "env"
        }
    }
```

**Flavor dimensions**\
A flavor dimension is essentially a group of flavors.
We can create final app versions by combining configuration from multiple flavor dimensions. It is not possible to combine flavors that belong to the same flavor combination, other then that all possible combinations of flavors are now available.

```gradle
    flavorDimensions "env", "mode"

    productFlavors {
        production {
            applicationId "com.example.kliss"
            dimension "env"
        }
        development {
            applicationId "com.example.kliss.dev"
            dimension "env"
        }

        free {
            minSdkVersion '24'
            dimension "mode"
        }
        paid {
            minSdkVersion '26'
            dimension "mode"
        }
    }
```

## Firebase projects

Now we need to create a folder in `android\app\src` for every firebase project we want to host. Make sure to call the folder the exact same your flavor is named! And save the google-services.json file for your deciered firebase project here.

To not get an error when running multiple flavors here and there, make sure to initialize Firebase with a name. And done!

```dart
WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    name: "prod",
    options: DefaultFirebaseOptions.currentPlatform,
  );
```

As mentioned in [flavors](..\flavor.md), we now need to create a main.dart file for each environment. To run these we now must provide both the flavor and the target file we want to run. `flutter run --flavor dev --target lib\main_dev.dart`\
Instead of doing this every time we can set up a [launch](..\..\..\Tools\Visual-studio-code\launch-json.md) in VSCode.