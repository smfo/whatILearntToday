# Testing basics

You can test both dart code and flutter widgets.

For dart code use this setup
```dart
void main(){
    group("Desciption", (){
        test("Description", (){
            // Test here
        })
    })
}
```

For widgets use testWidget instead
```dart
void main(){
    group("Desciption", (){
        testWidget("Description", (widgetTester){
            // Test here
        })
    })
}
```

Group is optional and just a way to structure the tests more. To show in the test menu, the filename has to end with `_test.dart`.

Using `flutter_test` you do checks using `expect(result, expected)`.

For mocks you can use [mocktail](../packages/mocktail.md).

```dart
main() {
  group('formToSessionJson', () {
    test("AllFieldsHasValue", () {
      var form = formValues;

      var expected = {dayReference: '123', dateField: DateTime(2017, 05, 12)};

      // target
      var result = formToSessionJson(form.value);

      expect(result, expected);
    });
  });
  ...

  FormGroup formValues = fb.group({
  dayReference: '123',
  dateField: DateTime(2017, 05, 12),
  exercisesFormName: fb.array([
    fb.group({
      exerciseReference: '1',
      noteSessionField: 'Push on up',
      setsFormName: fb.array([
        fb.group({weightField: '3', repsSessionField: 20, setOrderfield: 0}),
        fb.group({weightField: '70', repsSessionField: 3, setOrderfield: 1}),
        fb.group({weightField: '', repsSessionField: 7, setOrderfield: 3}),
      ])
    }),
    fb.group({exerciseReference: '2', noteSessionField: ''})
  ])
});

```