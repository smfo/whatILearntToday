/*When comparing values from multiple formfields to validate a form
ex. when confirming an email or a password*/


const userForm = this.fb.group({
    username: '',
    password: '',
    verifyPassword: ''
},{
    validator: this.passwordValidator
})


//setting the validator on the entire form, not the controls

static passwordValidator(form: FormGroup){
    const condition = form.get('password').value !== form.get('verifyPassword').value;
    return condition ? { passwordsDoNotMatch: true} : null;
}

//Custome password validator

<mat-error *ngIf="userForm.hasError('passwordsDoNotMatch')">
    Passwords do not match
</mat-error>

//HTML to display error message. Checking the FORM not the control for errors
/*BUT! an error will only display if a control says theres an issue, so need to 
make the control aware of the forms error.
Errors are shown if (the controler! is invalid and either touched) or (if the form is submitted).
To display the error when the form itself is invalid, we need to define a custom ErrorStateMatcher
for the control.
An ErrorStateMatcher is a class that defines when the control should display an error message
*/

class CrossFieldErrorMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        return (control.dirty || form.dirty) && form.invalid
    }
}

//form.dirty = control.parent.dirty

//The error state matcher is added to the input of the desiered form control(s)

<input
    matInput
	class="form-control"
	[formControl]="userForm.get('verifyPassword')"
    [errorStateMatcher]="CrossFieldErrorMatcher"
/>
<mat-error *ngIf="userForm.hasError('passwordsDoNotMatch')">
    Passwords do not match
</mat-error>