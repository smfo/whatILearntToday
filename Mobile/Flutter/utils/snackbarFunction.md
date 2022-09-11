# Snackbar utils

When activated, displays a snackbar with the chosen text.

```dart
class Utils {
  static void showSnackBar(BuildContext context, String message) =>
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(message)));
}

<!-- Use in widget -->
Utils.showSnackBar(context, "Some text");
```