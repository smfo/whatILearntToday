# Attribute directives

Attribute directives cannot be do not always have the same effect on all elements!

They are used as attributes of elements. The built-in NgStyles directive can f.ex. change several element styles at the same time.\
Creating a attribute directive, minimally requires building a controller class annotated with @Directive. This specifies the selector that identifies the attribute.

The example builds a attribute directive to set an element's background color on hover.\
Create directive command:
`ng generate directive highlight`

Directives must be decleared in angular modules in the same manner as components, in "declarations".

The generated file

```js
import { Directive } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
// it's the bracket [], that makes this an attribute selector instead of a component

export class HighlightDirective {
  constructor() { }
}


constructor(el: ElementRef) {
  el.nativeElement.style.backgroundColor = 'yellow';
}
```

```html
In component
<p appHighlight>Highlight me</p>
```

ElementRef grants direct access to the host DOM element through its nativeElement property

```javascript
import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  constructor(private el: ElementRef) { }

  @HostListener('mouseenter') onMouseEnter() {  //on hover
    this.highlight('yellow');
  }

  @HostListener('mouseleave') onMouseLeave() {  //no hover
    this.highlight(null);
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
```

@HostListener subscribes to events of the DOM element that host an attribute directive,
in this case that will be the `<p>`

## Pass values to directive

`@Input() highlightColor: String;`

Input value from the DOM like this

```javascript
<p appHighlight highlightColor="yellow"> Yellow hover</p>
<p appHighlight [highlightColor] = "'orange'" > Orange hover </p >
<p appHighlight [highlightColor] = "color" > Variable color hover </p >
```

To simulataniously add the directive and set the color, do this\
`<p [appHighlight] = "color" > Highlight me </p >`

For the above example to work, the highlightColor property has to be renamed to appHighlight\
`@Input() appHighlight: string;`\
This can therefore only be done with one input value. The input name is now missleading...

Therefore we want to use an alias for the directive property instead\
`@Input('appHighlight') highlightColor: string;`\
Inside the directive, the property is now known as highlightColor, while it is known as appHighlight outside of the directive

```javascript
import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(private el: ElementRef) { }

  @Input('appHighlight') highlightColor: string;
  @Input() componentDefaultColor: string;
  //all other inputs have to be set to its own property (with or without an alias), not the directive selector

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.highlightColor || this.componentDefaultColor || 'red');
    //if someone forgets to bind to appHighlight the default color is red
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}

//in the component
<p [appHighlight] = "color" componentDefaultColor = "violet" >
  Highlight me too!
</p >

```

## @Host @HostListener @HostBinding

@Host injects the instance of the host component/element in the directive. The directive can call the hosts public functions and set the value of public variables.

```js
//directive
constructor(@Host() private map: MapBaseComponent) {
  this.map.getmap();
  this.map.title = "Title from directive"
}

//Host
export class MapBaseComponent implements AfterViewInit, OnDestroy {
  public title: string = "Host title";

  public getMap(): ol.Map {
    return this._olMap;
  }
}
```

@HostBinding lets you set properties on the element or component host, and @HostListener lets you listen for events on the host.

In this example\
The hostbinding decorators attaches to the host's style.color and style.border-color variables\
The hostlistener listens for the keydown event on the host. When this happens, the value of
color and borderColor is changed, and are reflected on the host automatically

```javascript

@Directive({
  selector: '[appRainbow]'
})

export class RainbowDirective {
  possibleColors = [
    'darksalmon', 'hotpink', 'lightskyblue', 'goldenrod', 'peachpuff',
        'mediumspringgreen', 'cornflowerblue', 'blanchedalmond', 'lightslategrey'
      ];

  @HostBinding('style.color') color: string;
  @HostBinding('style.border-color') borderColor: string;
  @HostListener('keydown') newColor() {
    const colorPick = Math.floor(Math.random() * this.possibleColors.length);
    this.color = this.borderColor = this.possibleColors[colorPick];
  }


    <input type="text" appRainbow>
```

### Document/window/body

Use this to affect all components that uses this directive should something happen to one of them.

```js
@HostListener('document/window/body:event', ['$event'])
  /* Window, document and body can be used as global event targets, by using these all hosts
     accosiated with the directive will be affected by what happens in the method should
     it be activated by any host*/
```

Adding document in the previous example will change the color and background color on
all host components when a keydown event is activated in any of the host components.

```javascript
  @HostListener('document: keydown') newColor() {
    const colorPick = Math.floor(Math.random() * this.possibleColors.length);
    this.color = this.borderColor = this.possibleColors[colorPick];
  }
```
