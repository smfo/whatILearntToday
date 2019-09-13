
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


//example

@Component({
    selector : 'child',
    template : `
        <button (click)="sendNotification()">Notify my parent!</button>
    `
})

class Child {

    @Output() notifyParent: EventEmitter<any> = new EventEmitter();
    
    sendNotification() {
        this.notifyParent.emit('Some value to send to the parent');
    }
}



@Component({
    selector : 'parent',
    template : `
        <child (notifyParent)="getNotification($event)"></child>
    `
})

class Parent {

    getNotification(evt) {
        // Do something with the notification (evt) sent by the child!
    }
}