# Mocktail

[Documentation](https://pub.dev/packages/mocktail)\
`dart pub add mocktail`

Mocktail is an easy packare to create mocks in flutter.

To be able to use mocked instances, **they have to be provided using dependensy injection**, for example with Riverpod.

# Create mock

Create a class that extends Mock and implements the class you want to mock. That's it:

```dart
class MockRoutineClient extends Mock implements RoutineClient {}

class MockShortInfoClient extends Mock implements ShortInfoClient {}

void main() {

  group("getRoutineObject", () {
    test("ReturnsRoutinemodel", () async {
      const String workoutId = "123";
      final RoutineClient routineClient = MockRoutineClient();
      final ShortInfoClient infoClient = MockShortInfoClient();

      ...

      var target = await RoutineController(routineClient, infoClient).getRoutineObject(workoutId);

      // Do checks
    });
  });

  // Target
  class RoutineController {
  late final RoutineClient client;
  late final ShortInfoClient shortInfoClient;

  RoutineController(RoutineClient routineClient, ShortInfoClient infoClient){
    client = routineClient;
    shortInfoClient = infoClient;
  }
```

# Return values from function (when)

To return a value for a given function\
`when(() => <mock.function>).thenAnswer((_) => value)`\
When this function is called with the given parameters, the provided value is returned.

Use `thenAnswer` for futures and streams and `thenReturn` otherwise

```dart
test("ReturnsRoutinemodel", () async {
      const String workoutId = "123";
      final RoutineClient routineClient = MockRoutineClient();
      final ShortInfoClient infoClient = MockShortInfoClient();

      // Like this
      when(() => routineClient.getRoutine(workoutId)).thenAnswer((_) => Future.value(routine));
      // Or like this
      when(() => routineClient.getRoutineDays(workoutId)).thenAnswer((_) async => days);
      ...

      var target = await RoutineController(routineClient, infoClient).getRoutineObject(workoutId);
    });
  });
```

## Verify

Sometimes you don't only want to check the returnvalue of the target function, but also if certain functions in your mock has been called. We can do this by using `verify` or `verifyNever`.

`verify(() => <mock.function>).called()`\
There are also other functions available like `callCount`

```dart
   test("CallsClientWithExpectedJson", () async{
      FormGroup form = dayForm;
      String workoutId = "123";
      String dayId = "789";
      final RoutineClient routineClient = MockRoutineClient();
      final ShortInfoClient infoClient = MockShortInfoClient();

      when(() => routineClient.saveDayJson(any(), workoutId)).thenAnswer((_) async => dayId);
      when(() => routineClient.saveExerciseJson(any(), workoutId, dayId)).thenAnswer((_) async => "11");

      await RoutineController(routineClient, infoClient).saveDayAction(form, workoutId);

      verify(() => routineClient.saveDayJson(any(), workoutId)).called(1);
      verify(() => routineClient.saveExerciseJson(any(), workoutId, dayId)).called(2);
    });
  });
```

## Tips

### any()

Used to allow any value for a parameter. Maybe you don't know what the value will be, maybe you will call a function lots of times with a different value for this parameter and it doesn't make a difference.

```dart
verify(() => routineClient.saveDayJson(any(), workoutId)).called(1);
when(() => routineClient.saveDayJson(any(), workoutId)).thenAnswer((_) async => dayId);
```

### Named parameters
```dart
// Named parameters
when(() => cat.likes('fish', isHungry: false)).thenReturn(true);
expect(cat.likes('fish', isHungry: false), isTrue);
```

### reset

You can reset a mock like so `reset(<mock>);`

### Change mock output

```dart
// Stub a method before interacting with the mock.
when(() => cat.sound()).thenReturn('purrr!');
expect(cat.sound(), 'purrr!');

// You can interact with the mock multiple times.
expect(cat.sound(), 'purrr!');

// You can change the stub.
when(() => cat.sound()).thenReturn('meow!');
expect(cat.sound(), 'meow');

// You can stub getters.
when(() => cat.lives).thenReturn(10);
expect(cat.lives, 10);
```