# Override styling in node module

Original CSS in node module file.

```css
.flatpickr-day.today {
  border-color: #959ea9;
}

.flatpickr-day.selected {
  background: #569ff7;
}
```

## Angular - ::ng-deep

Normally css only applies to the html of the chosen component.

Adding `::ng-deep` to any css will make that style global, applying it to any component in the project using this class/tag.

In order to scope the style to only the specific component and it's decendants, include `:host` before `::ng-deep`.

### Multiple classes!

When applying `ng-deep` to multiple classes using the same style, the encapsulation needs to be applied to each class seperatly.

### node_modules

In some cases components from node_modules will be created inside their host angular component, in those cases `:host ::ng-deep` can be used.\
Other times this is not the case. The components can for example be created in a separate tag in the body. In those cases `::ng-deep` needs to be used.

```css
::ng-deep .flatpickr-day.today {
  border-color: #959ea9;
}

:host ::ng-deep .flatpickr-day.selected {
  background: #569ff7;
}
```
