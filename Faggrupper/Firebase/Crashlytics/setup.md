# Setup - Flutter

Install
```flutter pub add firebase_crashlytics```

Update your flutterfire
```flutterfire configure```

After initializing firebase add this to catch all unhandled errors
```dart
// Pass all uncaught "fatal" errors from the framework to Crashlytics
  FlutterError.onError = FirebaseCrashlytics.instance.recordFlutterFatalError;
```

Async errors arent caught by the Flutter framework. To recored them add this
```dart
// Pass all uncaught asynchronous errors that aren't handled by the Flutter framework to Crashlytics
    PlatformDispatcher.instance.onError = (error, stack) {
      FirebaseCrashlytics.instance.recordError(error, stack, fatal: true);
      return true;
    };
```

Force a crash
```dart
FirebaseCrashlytics.instance.crash()
```

## Debug

Disable crachlytics while debugging:

manifest.xml
```
<meta-data             
android:name="firebase_crashlytics_collection_enabled"            
android:value="${crashlyticsCollectionEnabled}" />
```

android/app/build.gradle
```
buildTypes {
        release {
            manifestPlaceholders["crashlyticsCollectionEnabled"] = true
        }
        debug {
            manifestPlaceholders["crashlyticsCollectionEnabled"] = false
        }
    }
```