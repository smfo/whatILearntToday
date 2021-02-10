# Angular components dynamic loading

## Component Factory

Base class for a factory that can create dynamic components.\
Instanciates a factory of for the given component type with `resolveComponentFactory()`. Then use the reslting `ComponentFactory.create()` to create a component of that type.

## Component Factory Resolver

A registry that maps components to generated ComponentFactory classes(a factory that can create a component dynamically), that are used to create instances of components. They are used to obtain the factory for a given component type, then `create()` is used to create a component of this type.

```JS
constructor(private componentFactoryResolver: ComponentFactoryResolver) {
  }

  const cf = this.componentFactoryResolver.resolveComponentFactory(templateTypes[displayPage.template]);
```

Generates a blueprint for creating a component, that the ViewContainerRef uses.

## View Container Ref

Represents a container where one or more views can be attached to a component.

All components added through a ViewContainerRef, will be siblings, not parent-child.

The View Container Ref only knows how to attach/remove components in the view, it cannot actually create them. That is what the ComponentFactoryResolver is for.

## Component Ref

Represents a component created by a ComponentFactory. This variable provides access to the component instance, `componentReference.instance`, and related objects. The component reference also provides the means to destroy the instance.