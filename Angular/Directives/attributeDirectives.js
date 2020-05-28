
// Attribute directives cannot be placed/have the same effect on all elements!

// Attribute directive
// are used as attributes of elements. the built-in NgStyles directive can f.ex. change several element 
// styles at the same time 
// minimally requires building a controller class annotated with @Directive. This specifies the selector that
// identifies the attribute.
// The example builds a attribute directive to set an element's background color on hover

// Apply like this
<p appHighlight> Highlight me </p>

// create directive command
ng generate directive highlight
// directives must be decleared in angular modules in the same manner as components, in "declarations"

// the generated file
import { Directive } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  constructor() { }
}

// it's the bracket [], that makes this an attribute selector

constructor(el: ElementRef) {
  el.nativeElement.style.backgroundColor = 'yellow';
}

// ElementRef grants direct access to the host DOM element through its nativeElement property

// making the directive more responsive
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

// @HostListener subscribes to events of the DOM element that host an attribute directive,
// in this case that will be the <p>

// Pass values into directive
@Input() highlightColor: String;

// input value from the DOM like this
<p appHighlight highlightColor="yellow"> Yellow hover</p>
  <p appHighlight [highlightColor] = "'orange'" > Orange hover </p >
    <p appHighlight [highlightColor] = "color" > Variable color hover </p >

      // to simulataniously add the directive and set the color, do this
      <p [appHighlight] = "color" > Highlight me </p >
// For this to work, the highlightColor property has to be renamed to appHighlight
@Input() appHighlight: string;
// this can therefore only be done with one input value. The input name is now missleading...
// therefore we want to use use an alias for the directive property instead
@Input('appHighlight') highlightColor: string;
// Inside the directive, the property is now known as highlightColor, while it is known as appHighlight outside
// of the directive


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

<p [appHighlight] = "color" componentDefaultColor = "violet" >
  Highlight me too!
</p >




  // @HostListener @HostBinding
  // @HostBinding lets you set properties on the element or component that hosts the directive, 
  // and @HostListener lets you listen for events on the host element or component.

  // the hostbinding decorators attaches to the host's style.color and style.border-color variables
  // the hostlistener listens for when the keydown event on the host. when this happens, the value of 
  // color and borderColor is changed, and are reflected on the host automatically
  <input type="text" appRainbow>


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

  @HostListener('document/window/body:event', ['$event'])
  // Window, document and body can be used as global event targets, by using these all hosts
  // accosiated with the directive will be affected by what happens in the method should 
  // it be activated by any host

  // Adding document in the previous example will change the color and background color or 
  // all host components when a keydown event is activated in any of the host components
  @HostListener('document: keydown') newColor() {
    const colorPick = Math.floor(Math.random() * this.possibleColors.length);
    this.color = this.borderColor = this.possibleColors[colorPick];
  }