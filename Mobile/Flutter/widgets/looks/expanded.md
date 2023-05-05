# Expanded

Works much like flexbox for web.

An Expanded widget must be placed within a `Row, Column or Flex`. It them expands in the main axis direction to take up as much space as it is allowed to.

If multiple children of set widget are Expanded, the space is devided evenly, or according to the `flex` property assigned.

Unlike Flex, Expanded **ignores child widgets width and height**.

```dart
Column(
      children: [
        Expanded(
            flex: 2
            child: Center(
              child: Text("Harry is here!",
                 key: Key('main_text'), style: TextStyle(fontSize: 28)),
        )),
        Expanded(
          flex: 3,
          child: Container(),
        ),
```

![alt text](expandedFlexible.png "Expanded vs flexible")

## Errors

*** InputDecorator, ... cannot have an unbounded width ***\
This happens when having multiple form fields inside the same Row, Column or Flex, because the field needs to be given width constraints.

This can be solved by placing the fieldwidgets inside an [Expanded](./looks/expanded.md)