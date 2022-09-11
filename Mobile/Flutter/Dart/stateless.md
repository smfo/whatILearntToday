# Stateful and stateless widgets

Stateless widgets are immutable, meaning that their properties can’t change — all values are final.

Stateful widgets maintain states that might change during the lifetime of the widget. Implementing a stateful widget requires at least two classes: 1) a StatefulWidget class that creates an instance of 2) a State class. The StatefulWidget class is immutable, however it can be thrown away and regenerated, whereas the State class persists over the lifetime of the widget.

```dart
class RandomWords extends StatefulWidget {
  const RandomWords({super.key});

  @override
  State<RandomWords> createState() => _RandomWordsState();
}

class _RandomWordsState extends State<RandomWords> {
  @override
  Widget build(BuildContext context) {
    return Container();
  }
}
```

## Stateful

These widgets consists of a stateful subclass and a state class. If the class manages it's own state, it overrides the `createState()` function, and calls this when it wants to build the widget. `createState()` typically returns an instance of a state class.

The state class contains the state of te widget and defines the widget's `build()`. When a value in the widget is changed, the state class calls `setState()`.

```dart
class FavoriteWidget extends StatefulWidget {
  const FavoriteWidget({super.key});

  @override
  State<FavoriteWidget> createState() => _FavoriteWidgetState();
}

class _FavoriteWidgetState extends State<FavoriteWidget> {
  int _favoriteCount = 41;
  bool _isFavorited = true;

  void _toggleFavorite() {
    setState(() {
      if (_isFavorited) {
        _favoriteCount -= 1;
        _isFavorited = false;
      } else {
        _favoriteCount += 1;
        _isFavorited = true;
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        IconButton(
          padding: const EdgeInsets.all(0),
          alignment: Alignment.centerRight,
          icon: (_isFavorited
              ? const Icon(Icons.star)
              : const Icon(Icons.star_border)),
          color: Colors.red[500],
          onPressed: _toggleFavorite,
        ),
        SizedBox(
          width: 18,
          child: SizedBox(
            child: Text('$_favoriteCount'),
          ),
        ),
      ],
    );
  }
}

```

## State management

Stateless widgets manage stheir own state. Some times it can be beneficial to manage stat in a different way. This can be that the parent handles the state or a mix of these two options.

### Parent handles state

It is always the widget that handles the state that is stateful! These parents will therefore be stateful, whereas the children are stateless.

The child passes the changes through a callbakc function and the parent calls setState.

### Mixed

In the case of a mixed approach, both widgets contain a state.