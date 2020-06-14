
# useRef

Used to allow direct access to an element in the DOM.

`const refContainer = useRef(initialValue);`

We can change the element in the DOM by changin the current value of the
refered element.\
You assign a reference to an element by so `{ref}={refContainer}`.
```javascript
const ImageToggleOnMouseOver = ({primaryImg, secondaryImg}) => {

    const imageRef = useRef(null);

    return(
        <img 
        onMouseOver={() => {
            imageRef.current.src = secondaryImg;
        }}
        onMouseOut={() => {
            imageRef.current.src = primaryImg;
        }}
        ref={imageRef}
        src ={primaryImg} alt=""/>
    );
};
```

```javascript
function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // `current` points to the mounted text input element
    inputEl.current.focus();
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```

Mutating a .current does not cause a re-render! If this is preferable, use 
useCallback() instead.