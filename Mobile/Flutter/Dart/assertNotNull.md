# The value is never null

Dart is tricky on types an types that can be set to null.. Also, its not that easy to change types all the time.

If you believe that the value of the expression should never be null, but you can’t change the type of the variable, and you’re willing to risk having an exception thrown at runtime if you’re wrong, then you can assert that the value isn’t null:

```dart
void f(String? s) {
// S is never null
  if (s!.length > 3) {
    // ...
  }
}
```