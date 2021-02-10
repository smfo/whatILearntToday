# Change

Whenever the mat-radio-group changes onChange is called with the event as input. In this example selectedUserRole is updated to \$event.value because of the ngModel connection

```html
<mat-radio-group
  [(ngModel)]="selectedUserRole"
  class="radio-button-with-space"
  (change)="onChange($event)"
>
  <mat-radio-button
    style="display: block;"
    *ngFor="let role of userRoles"
    [value]="role"
  >
    <span class="float-left pr-1"> {{ role.name }}</span>
  </mat-radio-button>
</mat-radio-group>
```

```js
public onChange($event: MatRadioChange) {
    //this isn't necessary because of ngModel
    this.selectedUserRole = $event.value;
    this.organizationNumber.setValue(this.selectedUserRole.isCompany ? this.selectedUserRole.id : '0');
    this.userService.setCurrentRole(this.selectedUserRole.id);
}
```

ngModel is still needed to set the correct default value of the form.\
If the form is not to be reloaded with a set value, the default value if empty, this is not necessary
