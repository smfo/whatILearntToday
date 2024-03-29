# Forms

Forms suck!

Therefore it is a lot easier to use a package than the basic flutter formwidgets.

[FlutterFormBuilder](https://pub.dev/packages/flutter_form_builder)

## Note!

* One form builder = one form. Doesn't matter how many widgets are a part of the tree, all formfields inside one formbuilder will be caught by the same _formKey.
* Some fields, for example TextField, needs a set size. Place them inside a Flexible/Expandable if needed

## Errors

*** InputDecorator, ... cannot have an unbounded width ***\
This happens when having multiple form fields inside the same Row, Column or Flex, because the field needs to be given width constraints.

This can be solved by placing the fieldwidgets inside an [Expanded](./looks/expanded.md)

```dart
Row(
              children: [
                Expanded(
                  flex: 1,
                  child: Container(
                    margin: const EdgeInsets.fromLTRB(0, 0, 5, 10),
                    child: ReactiveDropdownField(
                      formControlName: '$index.$exerciseSetsField',
                      items: getDropdownValues(8),
                      decoration: const InputDecoration(
                        labelText: exerciseSets,
                      ),
                    ),
                  ),
                ),
                Expanded(
                  flex: 2,
                  child: Container(
                    margin: const EdgeInsets.only(bottom: 10),
                    child: ReactiveTextField(
                      formControlName: '$index.$exerciseRepsField',
                      textCapitalization: TextCapitalization.sentences,
                      decoration: const InputDecoration(
                        labelText: exerciseReps,
                      ),
                    ),
                  ),
                ),
              ],
```