# Setup of reactive forms

Import `ReactiveFormsModule` to the module using the forms.

```JS
imports: [
    ReactiveFormsModule
    ]
```

In reactive forms the logic is built in the ts file.\
The formGroup is initialized here, validator are added and events are handeled.

```js
//In ts file, component containing form
  public dateForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.dateForm = this.formBuilder.group(
      {
        fromDate: [this.fromDateInput, Validators.required],
        fromTime: [this.fromTimeInput, Validators.required],
        toDate: [this.toDateInput, Validators.required],
        toTime: [this.toTimeInput, Validators.required],
      },
      {
        validators: null,
      }
    );
  }

  public onSubmit(){}
```

In the Html bind the form to a formGroup and the input fields, checkboxes etc. to a formControl

```html
<form [formGroup]="dateForm" (ngSubmit)="onSubmit()">
  <div class="row">
    <input #fromDate formControlName="fromDate" />
    <input #fromTime formControlName="fromTime" />
  </div>
  <div class="row">
    <input #toDate formControlName="toDate" />
    <input #toTime formControlName="toTime" />
  </div>
</form>
```
