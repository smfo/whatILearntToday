# Angular modal
This is angular material!

A popup that is opened when fiering a fuction from another component.

```js
// "parent" component

import {MatDialog, MatDialogConfig} from "@angular/material";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    constructor(private dialog: MatDialog) {}

    openDialog() {

        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;

        this.dialog.open(CourseDialogComponent, dialogConfig);
    }
}
```

Dialog component, import dialogRef.
```js
import {MatDialogRef} from "@angular/material";

@Component({
    selector: 'course-dialog',
    templateUrl: './course-dialog.component.html',
    styleUrls: ['./course-dialog.component.css']
})
export class CourseDialogComponent implements OnInit {

    form: FormGroup;
    description:string;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<CourseDialogComponent>,
    {}

    ngOnInit() {
        this.form = fb.group({
            description: [description, []],
            ...
        });
    }

    save() {
        this.dialogRef.close(this.form.value);
    }

    close() {
        this.dialogRef.close();
    }
}
```

The setup of the dialog html.
```html
<!-- dialog -->
<h2 mat-dialog-title>{{description}}</h2>

<mat-dialog-content [formGroup]="form">
  
    <mat-form-field>
        <input matInput
                placeholder="Course Description"
               formControlName="description">
    </mat-form-field>
      ....
 
</mat-dialog-content>

<mat-dialog-actions>
    <button class="mat-raised-button"(click)="close()">Close</button>
    <button class="mat-raised-button mat-primary"(click)="save()">Save</button>
</mat-dialog-actions>
```

## Passing data
To add data to the dialog from the "parent" add a data object to the configuration object.

```js
openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
        id: 1,
        title: 'Angular For Beginners'
    };

    this.dialog.open(CourseDialogComponent, dialogConfig);
}
```

In the dialog, inject `MAT_DIALOG_DATA` and save this as a local variable.
```js
constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<CourseDialogComponent>,
        @Inject(MAT_DIALOG_DATA) data) {

        this.description = data.description;
    }
```

## Pass out data
Out data can be passed when the dialog is closed.
```js
// Dialog
save() {
    this.dialogRef.close(this.form.value);
}
```

To access this information in the "parent" component, we need to subscribe to `afterClosed()`.

```js
openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
        id: 1,
        title: 'Angular For Beginners'
    };

    this.dialog.open(CourseDialogComponent, dialogConfig);
    
    const dialogRef = this.dialog.open(CourseDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
        data => console.log("Dialog output:", data)
    );    
}
```