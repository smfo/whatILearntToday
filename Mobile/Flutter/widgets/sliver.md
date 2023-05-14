# Sliver

Listview, gridview and other components all build on Sliver components.\
What is sliver? A SliverList is the same as a ListView. Though a ListView is a widget, a SliverList is a sliver and has to be used inside a ScrollView, usually a `CustomScrollView`.

Mot of the time we use the widget version. Though if we want advanced scrolling, such as a list inside a list or an animation you need to use CustomScrollView, hence the slivers.

## Nested sliverlist

Instead of nesting ListViews and using shrinkWrap, use SliverList inside a CustomScrollView. The content of SliverList will scroll with the rest of the content in the CustomScrollView and it gives better performance than ListView -> ListView.builder.

See example below

## SliverToBoxAdapter

Flutter has two protocols to draw widgets, Sliver and Box protocol. These cannot blindly we mixed. When mixed you will get this error `A RenderViewport expected a child of type RenderSliver but received a child of type RenderErrorBox`.\
If you need to use a box element, wrap it in a `SliverToBoxAdapter`.

```dart
body: CustomScrollView(
          slivers: [
            const SliverToBoxAdapter(child: WorkoutFormWidget()),
            SliverList(
                delegate: SliverChildBuilderDelegate(
                  (context, index) => CreateDayContainer(index),
                  childCount: _dayCount
                ),
            ),
            SliverToBoxAdapter(
              child: OutlinedButton(
                  onPressed: _incrementCounter, child: const Text("Add day")),
            ),
            SliverToBoxAdapter(
              child: Row(
                mainAxisAlignment: MainAxisAlignment.end,
                children: [
                  OutlinedButton(
                    onPressed: () => Navigator.pop(context),
                    child: const Text("Cancel"),
                  ),
                  const SizedBox(width: 10),
                  MaterialButton(
                    child: const Text(
                      "Add",
                      style: TextStyle(color: Colors.white),
                    ),
                    onPressed: () async {
                      saveTemplateAction(workoutForm).then((value) {
                        Navigator.pop(context);
                        Utils.showSnackBar(context, "Workout added");
                      }).catchError((e) {
                        Utils.showSnackBar(context, "Something went wrong");
                        return null;
                      });
                    },
                  ),
                ],
              ),
            ),
          ],
        ));
```