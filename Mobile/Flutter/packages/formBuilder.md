# Form Builder

A package that makes using forms a lot easier!\
You don't have to build the form from scratch adding validators, onchange, collect final user input etc.

There are also included common input fields and validators.

```
flutter pub add flutter_form_builder
```

## Example

Create a `_formkey` of type `GlobalKey<FormBuilderState>()`. add a `FormBuilder` widget and provid it with your key. Built in and custom input fields can be added in the FormBuilder widget.\
For each field you can add `FormBuilderValidators`. And through the formkey you can access the forms current state, values, reset, save and validate.

NB! You have to first save the currentState in order to be able to access it's values.

```dart
class CreateUserScreen extends StatelessWidget {
  final _formKey = GlobalKey<FormBuilderState>();
  ..

  @override
  Widget build(BuildContext context) {
    return FormBuilder(
        // Add form key
          key: _formKey,
          child: Column(
              // Add any input fields you want
            children: <Widget>[
              FormBuilderTextField(
                name: 'username',
                decoration: const InputDecoration(
                    labelText: 'Username',
                    fillColor: Colors.white,
                    filled: true),
              ),
              FormBuilderTextField(
                name: 'password',
                decoration: const InputDecoration(
                    labelText: 'Password',
                    fillColor: Colors.white,
                    filled: true),
              ),
              Row(
                children: <Widget>[
                  Expanded(
                    child: MaterialButton(
                      color: Theme.of(context).colorScheme.secondary,
                      child: const Text(
                        "Create user",
                        style: TextStyle(color: Colors.white),
                      ),
                      onPressed: () {
                        // Don't forget to save the form!
                        _formKey.currentState!.save();
                        if (_formKey.currentState!.validate()) {
                          // Access a specific input field value
                          loginService.registerEmailAndPassword(
                              _formKey.currentState!.value['username'],
                              _formKey.currentState!.value['password']);
                        } else {
                          print("validation failed");
                        }
                      },
                    ),
                  ),
                  const SizedBox(width: 20),
                  Expanded(
                    child: MaterialButton(
                      color: Theme.of(context).colorScheme.secondary,
                      child: const Text(
                        "Cancel",
                        style: TextStyle(color: Colors.white),
                      ),
                      onPressed: () {
                         // Reset form
                        _formKey.currentState!.reset();
                        Navigator.pop(context);
                      },
                    ),
                  ),
                ],
              )
            ],
          )),
}

```