# Align

Align is used to position child widgets inside the defined boarders of the parent widget.

This is done using the `aligntment` property, either with `FractionOffset.` or using exact positioning with `Aligntment(x, y)`. Where value vary from minus 1 to 1, and for x **-1 is up**.

Placement in example: horizontally centered, vertically low.
```dart
Align(
                // alignment: FractionalOffset.bottomCenter,
                alignment: const Alignment(0, 0.75),
                  child: ElevatedButton(
                      onPressed: () => {print("hey")},
                      child: const Text('Log in with Google')),
              ),
```

## With expanded

By using `Align` with `Expanded` you get to place the child anywhere in the remaining space on the screen without knowing how big it is (using Sizebox).

If you have one child in a Column that needs placement you could just use mainAxisAlignment though.