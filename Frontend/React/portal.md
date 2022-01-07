# Portal

Provides a way to render children into a DOM node outside the DOM hierarchy of the parent compoent.

Why would we want to do that? One example is in order to fix [stack context](../CSS/stackContext.md).

```jsx
ReactDOM.createPortal(child, container)
```

```jsx
render() {
  // React mounts a new div and renders the children into it
  return (
    <div>
      {this.props.children}
    </div>
  );
}
```

```jsx
render() {
  // React does *not* create a new div. It renders the children into `domNode`.
  // `domNode` is any valid DOM node, regardless of its location in the DOM.
  return ReactDOM.createPortal(
    this.props.children,
    domNode
  );
}
```

Even though the portal has a changed position in the DOM tree, the position in the React tree is still the same. Therefore, the portal behaves like a normal React child in any other way. This applies to features such as context and event bubbling.

## Implemantation example

We want to place the child component in the portal div.

```html
<div>
    <div id="app"></div>
    <div id="portal"></div>
</div>
```

```jsx
function Child(){
    return React.createPortal(
        <div className="modal">
            <button>Click<button>
        </div>,
        document.getElementById('portal')
    )
}
```