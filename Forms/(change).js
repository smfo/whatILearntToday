
//Whenever the mat-radoi-group changes onChange is called with the event as input. In this example selectedUserRole is updated to $event.value as well
<mat-radio-group [(ngModel)]="selectedUserRole" class="radio-button-with-space" (change)="onChange($event)">
		<mat-radio-button style="display: block;" *ngFor="let role of userRoles" [value]="role">
			<span class="float-left pr-1"> {{ role.name }} {{ role.type === 0 ? '(' + role.id + ')' : '' }} </span>
		</mat-radio-button>
</mat-radio-group>


public onChange($event: MatRadioChange) {
    this.selectedUserRole = $event.value;  //this isn't necessary because of ngModel
    this.organizationNumber.setValue(this.selectedUserRole.isCompany ? this.selectedUserRole.id : '0');
    this.userService.setCurrentRole(this.selectedUserRole.id);
}

//ngModel is still needed to set the correct default value of the form. 
//If the form is not to be reloaded with a set value, this is not necessary