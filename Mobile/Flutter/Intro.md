# Flutter

SDK made by Google to create single source mobile apps for android and iOS.

Flutter uses a programming language called `dart`.

```
C:\src>git clone https://github.com/flutter/flutter.git -b stable
```

After cloning the repo run `flutter doctor` in the flutter console, this will tell you is the SDK is installed correctly. If the console window only flashes when clicked, run cmd and `flutter_console.bat` from there.

If needed, to get flutter to work anywhere on the computer, add the flutter\bin to the user variables path, and/or C:\windows\system32 and git path to your system variables path.

## Widget

Essentially a component, organised in a hirerchy with containers, headers etc.

## Dart

A statically typed programming language, like typescript.

```dart
void main() {
  String name = "Synne";
  print(name);
}
```