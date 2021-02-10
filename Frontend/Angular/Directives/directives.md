# Directives

Directives take an already existing element and add logic to it.

There are three kinds:

- Components - directives with a template
- Structural directives - change the DOM layout by adding and removing DOM elements
- Attribute directives - change the appearence or behavior of an element, component or another directive

A directive is a class that uses a @Directive() decorator. As components their metadata is associated with a selector element inserted into HTML. In templates, directives typically appear withing a tag as an attribute, by name as the target of an assignment or binding.

You can apply many attribute directives to a host Element, but only one structural directive.

## Components

Components are directives with templates. They are so distinct and central in Angular that they have a special decorator @Component(), which extends @Directive() with template-oriented features.\
Whereas directives are used to add behavior to an already existing DOM Element, components are used to create encapsulated visual behavior, components.
