# ListView

Make the screen into a list and make the screen scrollable.

Wrap the list of widgets in the `ListView` widget instead of a `Column`.

## ListView.builder

Take a list of objects and builds widgets for each one dynamically, instead of using a function that returns a widget per object.

Using function
```dart
final List days = ["Day 1", "Day 2", "Day 3"];

List<Widget> getDays(){
    List<Widget> list = []

    for (var day in days){
        list.add(Day());
    }

    return list;
}


return ....
    ...getDaysFormWidgets(),
```

Using ListView.builder\
We need to specify an itemCount and an itemBuilder, that will return the widget we want to create for all items in the list.

NB: do not nest scrollable widgets!\
We need to specify a height for out ListView. For example by using Expanded.
```dart
final List days = ["Day 1", "Day 2", "Day 3"];

return ...
Expanded(
    child: ListView.builder(
            itemCount: days.length,
            itemBuilder: (context, index) =>
                Day()
            ),
        )
```

## Shrinkwrap

Some times we want the list to take up as little space as possible, in these cases set `shrinkWrap: true`.

This is costly for large lists, as shrinkwrap evaluates the entire list and renders it all from the moment the widget is rendered.

## ListView.builder inside ListView

It is possible to use a ListView(.builder) nested. Either using Expanded or ShrinkWrap to define it's height. However, don't do this, use [Sliver](sliver.md) instead.