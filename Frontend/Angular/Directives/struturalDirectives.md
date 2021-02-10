# Structural directives

Structual directives are responsible for HTML layout. They typically addEventListener, remove or manipulate elements to reshape the DOM's structure.

Structural directives are preceded by a \*

```html
<div *ngIf="hero">{{ hero.name }}</div>

<div [ngSwitch]="hero?.emotion">
  <app-happy-hero *ngSwitchCase="'happy'" [hero]="hero"></app-happy-hero>
  <app-sad-hero *ngSwitchCase="'sad'" [hero]="hero"></app-sad-hero>
  <app-confused-hero
    *ngSwitchCase="'confused'"
    [hero]="hero"
  ></app-confused-hero>
  <app-unknown-hero *ngSwitchDefault [hero]="hero"></app-unknown-hero>
</div>
```

Three of the common built-in structural directives are ngIf, ngFor and ngSwitch

It is possible to make custom structural directives. look it up
