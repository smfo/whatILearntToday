
Purpose: to emit events as an @Output to the parent component


//In child component
@Output delete: EventEmitter = new EventEmitter();

this.delete.emit(value);
//or in html
<button (click)="delete.emit(value)" >

//In parent component
<child-component (delete)="deleteValue($event)"> </child-component>

public deleteValue(name: string){
    
}
