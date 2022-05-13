# Final vs Const

Final can be used for parameters where the value is not set on initialization, but will never change once it is set.\
Typically used for input parameters.\
Used for runtime constant values.

Const parameter values are set on initialization.\
Used for compiletime constant values.

```Dart
const question = "What is this?"

// Gives an error
const answer;
```

```dart
// This value will never change once set
final String name;

SomeWidget(this.name)
```

## Value as const

The parameter value can change, but the value itself cannot.

Why vould we want to do this? F.ex. if we have a parameter set to a list and don't want to be able to modify the list directly. However, resetting it is fine.

```dart
var someList = const [1, 3, 7, 8];

someList = [];
```