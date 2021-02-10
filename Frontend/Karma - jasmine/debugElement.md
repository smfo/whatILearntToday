
# Degub element

NativeElement returns a reference to the DOM element.\
DebugElement is an Angular2 class that contains all kinds of references and methods relevant to investigate an element or component.

```js
abstract class ComponentFixture {
    debugElement;       // test helper 
    componentInstance;  // access properties and methods
    nativeElement;      // access DOM
    detectChanges();    // trigger component change detection
}
```