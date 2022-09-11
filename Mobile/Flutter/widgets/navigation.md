# Navigation in Flutter

## Navigator

Navigator contains a stack of app routes. Pushing a route to the stack updates the display to view this route. Popping returns the user the the previous route.

```dart
void _pushSaved() {
    Navigator.of(context).push(
      MaterialPageRoute<void>(
        builder: (context) {
          
          // building route page
          final tiles = _saved.map(
            (pair) {
              return ListTile(
                title: Text(
                  pair.asPascalCase,
                  style: _biggerFont,
                ),
              );
            },
          );

          final divided = tiles.isNotEmpty
              ? ListTile.divideTiles(
                  context: context,
                  tiles: tiles,
                ).toList()
              : <Widget>[];

        // Display to push onto navigator stack
          return Scaffold(
            appBar: AppBar(
              title: const Text('Saved Suggestions'),
            ),
            body: ListView(children: divided),
          );
        },
      ),
    );
  }
```

If you add a Scaffold and an AppBar a back button will be adfed for you and you do not have to implement a pop function.