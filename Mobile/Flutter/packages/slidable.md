# Slidable

`flutter pub add flutter_slidable`

A package that lets you slide widgets, from left-to-right og right-to-left, to display actions that can be dismissed.

Wrap the widget in a `Slidable` and add it as child. This will be what the user sees when the component is not dragged to either side.\
Add startActionPane (left-to-right) or endActionPane (right-to-left) to use the widget as intended. These can take a motion, that dictates how the draggable actions will be animated when displayed, and children. The children are where you add the draggable actions. They are meant to be of `SlidableAction`.

```dart
Slidable(
    endActionPane: ActionPane(
      motion: const DrawerMotion(), 
      children: [
        SlidableAction(
            onPressed: (context) => showBookDialog(context),
            backgroundColor: Colors.grey,
            icon: Icons.edit,
            label: "Edit"),
        SlidableAction(
            onPressed: (context) {
              bookService.deleteBook(book.id!);

              Utils.showSnackBar(context, '${book.title} deleted');
            },
            backgroundColor: Colors.red,
            icon: Icons.delete,
            label: "Delete")
      ]),
    child: Column(
        children: <Widget>[
          ListTile(
            leading: const Icon(Icons.book),
            title: Text(
              book.title,
              style: const TextStyle(fontWeight: FontWeight.w400, fontSize: 20),
            ),
            subtitle: Text(book.author),
          )
        ],
      ),
    );
```

## vs Dismissable

Dismissable does not display actions that can be pressed when the widget is dragged to one side. It automatically dismisses the widget and executes the action assosiated with the performed dragging direction.