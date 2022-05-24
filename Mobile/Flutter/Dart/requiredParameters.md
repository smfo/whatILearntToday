# Required

How to use parameters in Dart.\
From Dart 2.12:

There are multiple ways to get parameters when initialising a class.

When using this method, the parameters are by default requierd.

```dart
class Test {
  final String x;
  Test(this.x);
}

final value = Test("Hello");

// Not allowed
final value = Test();
```

If the parameters are surrounded by curly braces, they become named parameters as well as optional.\
Therefore the parameters must either be nullable or have a default value

```dart
// Nullable
class Test {
  final String? x;
  Test({this.x});
}

// Default value
class Test {
  final String? x;
  Test({this.x = ''});
}

final value = Test(x: "Hello");
final value = Test();
```

## Required named parameters

Some times we want to use required named parameters where there is no good default value. To do this we add the required keyword to the constructor.

```dart
class Test {
  final String x;
  Test({required this.x});
}

final value = Test(x: 'hello');

final value = Test(); 
// The named parameter 'x' is required, but there's no corresponding argument.
```