# Adding assets

- Create an assets folder in the root of the project
- Add, either individual assets or whole folders, to the pubspec.yaml under "Flutter". NB! NOT Dependencies - Flutter
- Refer to the assets from your flutter files

```yaml
flutter:

  uses-material-design: true

  # To add assets to your application, add an assets section, like this:
  # assets:
  #   - images/a_dot_burr.jpeg
  #   - images/a_dot_ham.jpeg

  # An image asset can refer to one or more resolution-specific "variants", see
  # https://flutter.dev/assets-and-images/#resolution-aware

  # For details regarding adding assets from package dependencies, see
  # https://flutter.dev/assets-and-images/#from-packages

  assets:
   - assets/img/lake.jpg
#    - assets/img/ to add the whole folder
```

In the widgets, use the relative path to the asset (rightclick and chose 'Copy relative path') in order to avoid a 'the following assertion was thrown resolving an image codec unable to load asset' error.
```dart
// In widget

Image.asset('assets/img/lake.jpg',
              width: 600, height: 240, fit: BoxFit.cover),
          titleSection,
```