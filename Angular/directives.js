
// An attribute directive changes the appearance or behavior of a DOM Element
// there are three kinds
//   Components - directives with a template
//   Structural directives - change the DOM layout by adding and removing DOM elements 
//   Attribute directives - change the appearence or behavior of an element, component or another directive


// directives take an already existing element and add logic to it 


// Attribute directive
// are used as attributes of elements. the built-in NgStyles directive can false.ex. change several element 
// styles at the same time 
// minimally requires building a controller class annotated with @Directive. This specifies the selector that
// identifies the attribute.
// The example builds a attribute directive to set an element's background color on hover

// Apply like this
<p appHighlight> Highlight me </p>

// create command
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

// @HostListener subsribes to events of the DOM elemnt that host an attribute directive,
// in this case that will be the <p>

// Pass values into directive
@Input() highlightColor: String;

// input value from the DOM like this
<p appHighlight highlightColor="yellow"> Yellow hover</p>
<p appHighlight [highlightColor]="'orange'"> Orange hover </p>
<p appHighlight [highlightColor]="color"> Variable color hover </p>

// to simulataniously add the directive and set the color, do this
<p [appHighlight]="color"> Highlight me </p>
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

<p [appHighlight]="color" componentDefaultColor="violet">
  Highlight me too!
</p>

