# Forms

Forms suck!

Therefore it is a lot easier to use a package than the basic flutter formwidgets.

[FlutterFormBuilder](https://pub.dev/packages/flutter_form_builder)

## Note!

* One form builder = one form. Doesn't matter how many widgets are a part of the tree, all formfields inside one formbuilder will be caught by the same _formKey.
* Some fields, for example TextField, needs a set size. Place them inside a Flexible/Expandable if needed