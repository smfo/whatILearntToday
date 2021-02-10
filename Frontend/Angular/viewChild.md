# ViewChild

A property decorator that configures a view query. Looks for the first element/directive that matches the selector in the view DOM.

Accesses a DOM element directly from the component in the ts file.\
`pageTemplateHost.nativeElement` is equivalent to `document.getElementById('TemplateReference')`.

```Js
  @ViewChild(TemplateHostDirective) pageTemplateHost: TemplateHostDirective;
```

This allow you to add/access components inside the child-component itself (from the parent).\
To make sure that the reference injected by @ViewChild is present, the initialization code should be written in ngAfterViewInit.

ViewChild can only be used on the direct template of the component it is placed in.

We can inject whole components as well as HTML elements. In order to do this, the HTML element needs to be assigned a template reference.

```html
<!-- template -->
<h2 #title>Reference this</h2>
<custom-component #child></custom-component>
```

This can now be injected directly into the component class.\
Because the element is not an Angular component, it is wrapped by an ElementRef and it is retrieved by accessing the nativeElement property.\
The element is not yet accessible in ngOnInit, only ngAfterViewInit!

```JS
 @ViewChild('title') title: ElementRef;

  ngAfterViewInit() {
    console.log('Values on ngAfterViewInit():');
    console.log("title:", this.title.nativeElement);
  }
```

## ViewChild element inside ngIf
As ngAfterViewInit is only executed once, some times we need to initialize the `ViewChild` variable in other ways. This applies if the DOM element is not always created after ngAfterViewInit is run. ngIf, ngFor, ng-template etc. In that case we need to assign a setter.

```js
 private contentPlaceholder: ElementRef;

 @ViewChild('contentPlaceholder') set content(content: ElementRef) {
    if(content) { // initially setter gets called with undefined
        this.contentPlaceholder = content;
    }
 }
```

NB: the setter is executed every time the value is changed. If there is a subscription in the setter code, save the subscription as a variable and check if one already exists before creating a new one.

## ViewChildren
Provides a QueryList of ElementRef elements. 
```js
@ViewChildren('divElementVar') divElementRefs: QueryList<ElementRef>;
@ViewChildren('oneElement, secondElement') divElementRefs: QueryList<ElementRef>;
```

This can be used to retrieve multiple instances of the same child component.
```js
// child component
@Component({
  selector: 'alert',
})
export class AlertComponent

// parent
import { QueryList } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <alert></alert>
    <alert type="danger"></alert>
    <alert type="info"></alert>
  `,
})
export class App {
  // Find all elements of type AlertComponent
  @ViewChildren(AlertComponent) alerts: QueryList<AlertComponent>
  
  ngAfterViewInit() {
    this.alerts.forEach(alertInstance => console.log(alertInstance));
  }
}
```

As for `ViewChild`, `ViewChildren` supports directive/component types and the name of template variables (ids). When using a component/directive the return value will be the instance of that type. When using the template variable, the return value will be a reference to the native element.\

```js
import { QueryList } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <div #div>#div is a template variable</div>
  `,
})
export class App {
  // Find all elements with a template variable name of div
  @ViewChildren("div") divs: QueryList<any>
  
  ngAfterViewInit() {
    // This will print a nativeElement
    this.divs.forEach(div => console.log(div));
  }
}
```
The return type in both cases is QueryList, imported from **@angular/core**. An object that stores a list of items. When the state of the application changes Angular will automatically update the object items.\
On of it's methods is `toArray()` that returns the items as a javascript array.

The list has a `changes` method we can subscribe to. Any time a child element is added, removed or moved, the query list is updated and an observable of the query list will emit a new value.
```js
ngAfterViewInit(): void {
    this.options.changes
        .subscribe(() => console.log(this.options)); 
}
```

## ContentChildren
`ViewChildren` does not return elements that exist within a `ng-content` tag. To get these we need to use `ContentChildren`.

```js
// Tab component
@Component({
  selector: 'tab',
  template: `
    <p>{{title}}</p>
  `,
})
export class TabComponent {
  @Input() title;
}

// Tabs component
import { QueryList } from '@angular/core';

@Component({
  selector: 'tabs',
  template: `
    <ng-content></ng-content>
  `,
})
export class TabsComponent {
 // Retrieve all instances of TabCompoent from ng-content
 @ContentChildren(TabComponent) tabs: QueryList<TabComponent>
 
 ngAfterContentInit() {
   this.tabs.forEach(tabInstance => console.log(tabInstance))
 }
}

// Parent component
@Component({
  selector: 'my-app',
  template: `
    <tabs>
    <!-- Instances of tab in ng-content of the tabs component -->
     <tab title="One"></tab>
     <tab title="Two"></tab>
    </tabs>
  `,
})
```