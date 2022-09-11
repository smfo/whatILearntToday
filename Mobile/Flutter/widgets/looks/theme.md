
# Flutter theme

Set a theme in order to create consistency in your app. You can set up a theme to use in the entire app, several themes for different sections of the app, smaller themes for buttons, text etc and more.

**Primary**\
Use primarySwatch to set the primary color themene for your application. This will create a selection of variants from your primary and use this in the components throughout the app. When setting primarySwatch, you have to use a **material color**, create your own [here](../../utils/materialSwatch.md), because Flutter already has all of it's shades.

**Secondary**\
NB! secondary does not exist in dark mode!

```dart
colorScheme: ColorScheme.fromSwatch().copyWith(
      secondary: Colors.red, // Your accent color
    ),
```

You can access **deffined** properties from your theme like so. Make sure you are using the correct context!

```dart
Theme.of(context).primaryColor
Theme.of(context).colorScheme.primary
Theme.of(context).colorScheme.secondary
```


where to see what is affected by theme??