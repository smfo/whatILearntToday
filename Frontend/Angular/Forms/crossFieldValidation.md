# Cross Field Validation

When comparing values from multiple formfields to validate a form
ex. when confirming an email or a password. We need to set the validator on the entire form, not the controls

```js
const userForm = this.fb.group(
  {
    username: "",
    password: "",
    verifyPassword: "",
  },
  {
    validator: this.passwordValidator,
  }
);
```

The validator should return an object like so `{errorName: true}`

```js
passwordValidator(form: FormGroup){
    const condition = form.get('password').value !== form.get('verifyPassword').value;
    return condition ? { passwordsDoNotMatch: true} : null;
}
```

## Custome password validator

HTML to display error message. Checking the FORM not the control for errors.

```html
<mat-error *ngIf="userForm.hasError('passwordsDoNotMatch')">
  Passwords do not match
</mat-error>
```

BUT! an error will only display on the input field if a CONTROL says theres an issue, so we need to make the control aware of the FORMS error.\
Errors are normally shown if the controler! is invalid and either touched or dirty or if the form is submitted.

```html
<input
  formControl="verifyPassword"
  [ngClass]="{'is-invalid': 'userForm.hasError('passwordsDoNotMatch') 
|| ((userForm.get('verifyPassword').touched || userForm.get('verifyPassword').dirty) 
&& !userForm.get('verifyPassword').valid)'}"
/>
```

## ErrorStateMatcher

This is a part of Angular material!

To display the error when the form itself is invalid, we need to define a custom ErrorStateMatcher for the control.
An ErrorStateMatcher is a class that defines when the control should display an error message.

```js
class CrossFieldErrorMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    return (control.dirty || control.parent.dirty) && control.parent.invalid;
  }
}
```

This matcher says that errors are displayed if the control itself or the parent is dirty and the parent is invalid. **The default settings still apply, so errors will also be shown if the control is invalid.**

The error state matcher is added to the input of the desiered form control(s)

```html
<input
  matInput
  class="form-control"
  [formControl]="userForm.get('verifyPassword')"
  [errorStateMatcher]="CrossFieldErrorMatcher"
/>
<mat-error *ngIf="userForm.hasError('passwordsDoNotMatch')">
  Passwords do not match
</mat-error>
```
