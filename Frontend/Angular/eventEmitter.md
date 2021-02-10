# Event emitter

Purpose: to emit events as an @Output to the parent component

In child component: define the variable as an Output and emit the event

```JS
@Output delete: EventEmitter = new EventEmitter();

this.delete.emit(value);

//or in html
<button (click)="delete.emit(value)" >
```

In parent component: define a function to react to the output, output events are "captured" by using ()

```JS
<child-component (delete)="deleteValue($event)"> </child-component>

public deleteValue(name: string){

}
```

example

```JS
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


//Parent component
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
```
