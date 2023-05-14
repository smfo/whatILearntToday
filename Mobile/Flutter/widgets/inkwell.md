# Inkwell

Inkwell is a widget that creates a rectangular area that responds to touch.\
In must have a material widget as an ancestor, as this is where the reaction is painted.

Inkwell can be used to greate splash (visual) effects on tap, and also to make any widget into a button.

You can react to normal clicks, double clicks and long clicks

```dart
Expanded(
    child: ListView.builder(
        itemCount: ..
        itemBuilder: (_, index){
            return InkWell(
                onTap: () => Navigator.of(context).push(
                    MaterialPageRoute(
                        ...
                    )
                ),
                child: Card(...)
            )
        }
    )
)
```