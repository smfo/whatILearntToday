# Dependency Injection

Dependency injection in Angular is done by in the constructor of the component. Files that can be used with dependency injection has a `@Injectable` declaration.

```JS
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  constructor() { }
}
```

This injectable can then be used in a component. They are provided by the angular injector.

```JS
export class HeroListComponent {
  heroes: Hero[];

  constructor(heroService: HeroService) {
    this.heroes = heroService.getHeroes();
  }
}
```

Or using the shortcut version (also works with public/protected)

```JS
export class HeroListComponent {
  constructor(private heroService: HeroService) {}
}
```
