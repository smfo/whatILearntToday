# AppBar

An appbar is the header of an app, typically used directly inside the first Scaffold widget.

## Actions

Actions are displayed to the right of the appbar title, typically buttons like "Sign in", "Menu" etc.

If these actions are TextButtons, they will not be visible if their text color is the same as the appbar backgroun color.\
This will be the case when using ColorScheme.primary and light themed buttons!

To override the button color
```dart
 @override
  Widget build(BuildContext context) {
      // Define button styling
    final ButtonStyle style =
        TextButton.styleFrom(primary: Theme.of(context).colorScheme.onPrimary);
    return Scaffold(
      appBar: AppBar(
          //Appbar actions
        actions: <Widget>[
          TextButton(
            style: style,
            onPressed: () {},
            child: const Text('Action 1'),
          ),
          TextButton(
            style: style,
            onPressed: () {},
            child: const Text('Action 2'),
          )
        ],
      ),
    );
  }
```

```dart
 @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        //Appbar actions
        actions: <Widget>[
          TextButton(
            style: style,
            onPressed: () {},
            // Define button styling
            child: child: const Text('Sign out', style: TextStyle(color: Colors.white)),
          ),
        ],
      ),
    );
  }
```