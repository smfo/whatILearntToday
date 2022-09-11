# MaterialStateProperty<Color>

Material state keeps track of the stat of your widget, hover, focused, clicked etc and assigns styling accordingly.

To customize this, build a function that checks and returns different values depending on the state of the widget.

## All

If you absolutly do not care, you can just assign the same styling to all states using `all`.

```dart
outlinedButtonTheme: OutlinedButtonThemeData(
          style: ButtonStyle(
              foregroundColor: MaterialStateProperty.all(Colors.amber))),
```

## Mobile

For a simpler approach when the app only targets mobile, and do not have to deal with this state, use the method `styleFrom()` on the buttonclasses. This returns a ButtonStyle instance that takes simple variables.

This allows you to ignore all the fancy stuff, but still get to customize styling for things like disabled.

Also see [colors](./colors.md)

```dart
outlinedButtonTheme: OutlinedButtonThemeData(
        style: OutlinedButton.styleFrom(
            primary: Colors.amber,          // Color for all other states
            onSurface: Colors.purple        // Color for disabled text
        ),
      ),

elevatedButtonTheme: ElevatedButtonThemeData(
          style: ElevatedButton.styleFrom(
              primary: Colors.amber,    // background color
              onPrimary: Colors.black,  // text color on primary
              onSurface: Colors.grey)), // disabled
```

