# Private fields

Dart doesnt have the keywords private, public, etc. Instead underscore is used to mark variables and methods that can only be accessed inside the library (a libary being a class, widget etc).

```dart
class TravelEvent {
  final String _visitor;
  TravelState travelState;

  TravelEvent(this._visitor, this.travelState);
}
```