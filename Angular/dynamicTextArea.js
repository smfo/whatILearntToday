

// Making a dynamic textarea requires angular material 6 or newer

// The cdkTextareaAutosize directive can be applied to any <textarea> to make it automatically 
// resize to fit its content. The minimum and maximum number of rows to expand to can be set via 
// the cdkAutosizeMinRows and cdkAutosizeMaxRows properties respectively.

<mat-form-field>
    <mat-label>Autosize textarea</mat-label>
    <textarea
        matInput
        cdkTextareaAutosize
        cdkAutosizeMinRows="1"
        cdkAutosizeMaxRows="5"
        style="overflow:hidden">   //removes the stupid scrollbar
    </textarea>
</mat-form-field>