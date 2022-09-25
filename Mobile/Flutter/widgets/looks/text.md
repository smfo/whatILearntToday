# Text

There is a Text widget in Flutter. If no styling is specified for this, textbody2 will be used by default.

There are no other text widgets (except rich text that allows multiple styles within one text) such as headings. To get these you have to style your text with the chosen theme.

```dart
Text( 
  "hello world",
  style: Theme.of(context).textTheme.headline1, // like <h1> in HTML
)
```