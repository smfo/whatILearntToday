# Widget testing



## Pump

Pump is used to load a widget

PumpWidget is used to initialize the widget before the test. Pump a `MaterialApp(home: <targetWidget>)`, not the target widget directly. Othervise it will cause errors.

PumpAndSettle means all changes in the widget is done. Typically if you have a loadinganimation and want to test the widget after this is done.

```dart
testWidgets('Widget should load with default routine name', (widgetTester) async{
    await widgetTester.pumpWidget(
      ProviderScope(
        overrides: [
          routineControllerProvider.overrideWithValue(FakeRoutineProvider())],
        child: const MaterialApp(home: WorkoutContainer("Active"))
        )
    );

    // Check for loading widget
    expect(find.byType(CircularProgressIndicator), findsOneWidget);

    // Wait for all screens to have loaded
    await widgetTester.pumpAndSettle();

    // Check for no loading widget
    expect(find.byType(CircularProgressIndicator), findsNothing);
    expect(find.byType(AppBar), findsOneWidget);
    expect(find.text("Mock routine"), findsOneWidget);
  });
```

## Find

Use this to access elements in the widget.

Examples: find.text, find.byType, find.byKey

### Scrollable screens

NB! Find only detects widgets that are on screen. This is because Find only detects widgets that are one screen.

This can be solved by using `await widgetTester.enusreVisible(<widget>)`, however this only works if the widget is created, just not visible. This won't work with ListView, because it is optimixed to only create widgets that are visible.

## Tap

Use to interact with the UI in the test.