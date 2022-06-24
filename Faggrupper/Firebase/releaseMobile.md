# Release app

## Beta

In the console go to `app distribution`. Here you can add testers and create groups that will have access the the app versions you decide.

To create a release, upload an apk file (android).


## Build apk file (Flutter)
```
flutter build apk --release

<!-- For ios -->
flutter build ios --release
```

Get the file from this location in the project `build/app/outputs/flutter-apk/app-release.apk`.\
Upload apk file in releases in firebaser