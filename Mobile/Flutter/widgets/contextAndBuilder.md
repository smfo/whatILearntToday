# Context

A flutter context belongs to a widget. It contains some information that helps the widget determind some things about itself. Like where it is placed in the widget tree.

## Using context inside a widget

The context information applies to the outer layer of the widget, in other words, the class that is defined in that file.\
This is important to understand because some times we want to pass a context to a widget created in another widgets build method.\
Typically to look up some information about the parent.

The error you get can be resolved by moving the child widget into it's own file, however it might be really small or there is some other reason for not doing this. In that case we need a builder.

## Builder

A builder essentially creates a new widget inside another widget definition. You get a new buildcontext and everything, without having to create a new file.

By doing this you can create a reference, context, to a widget like the one in the example above.

```dart
Widget build(BuildContext context) {
  return Scaffold(
    body: Center(
      child: TextButton(
        onPressed: () {
          // Fails because Scaffold.of() doesn't find a Scaffold
          // above this widget's context.
          print(Scaffold.of(context));
        },
        child: Text('hasAppBar'),
      )
    ),
  );
}
```

```dart
Widget build(BuildContext context) {
  return Scaffold(
    body: Builder(
        // A new context if created, referensing the Center widget
      builder: (BuildContext newContext) {
        return Center(
          child: TextButton(
            onPressed: () {
                // This context can locate a parent Scaffold widget
              print(Scaffold.of(newContext).hasAppBar);
            },
            child: Text('hasAppBar'),
          ),
        );
      },
    ),
  );
}
```

The builder will make sure that the parent widget is built, and can be referenced, before it builds it's own widget.