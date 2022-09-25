# Flutter with VSCode

Install the Flutter and Dart extentions.

To create a new project: `ctrl + shift + p` - flutter: new project.\
Or `flutter create <app-name>` in terminal.

## Run emilator

The available emilators are available in the bottom right corner, (edge, chrome, android emulator). The app wil run in the selected one when clicking `F5` or when rightclicking the main.dart file (with or without debugging).

To run emilator, not in browser, install android studio.\
After setting up an emilator here, run `flutter doctor`. If there are probems with the android lisense, rund the suggested commands to install and accept.

To hot reload press `r` in the same terminal that runs the app.

## Handle const

Let VSCode automatically handle const values! Only adding them, not removing when that is needed.

View -> Command palette -> Open user settings (JSON)

Add this

```json
"editor.codeActionsOnSave": {
        "source.fixAll": true
    },
```

On save, VSCode will handle all missing consts!