# WillPopScope

Wrap a screen in this widget in order to disable the backbutton on the phone.


```dart
return WillPopScope(
      onWillPop: () async {
        return false;
      },
      child: Scaffold(
        ...
      ),
    );
```

This will also disable the back arrow in the appbar, whereas `navigator pop` still works.\
Because of this we can adjust the appbar by inserting av iconbutton and use `navigator pop`.

```dart
return WillPopScope(
      onWillPop: () async {
        return false;
      },
      child: Scaffold(
        appBar: AppBar(
          title: Text(workoutInformation.name),
          leading: IconButton(
              onPressed: (){
                Navigator.of(context).pop();
              },
              icon: const Icon(Icons.arrow_back)
          )),
        ...
      ),
    );
```