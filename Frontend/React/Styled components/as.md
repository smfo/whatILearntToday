# "as" (polymorphic prop)

This is used if we want to style two elements the same way, but we do not want them to be the same type pf html element.\
We can then use the styled component we want, but rented it `as` another type of html element, so it's behavior will follow this type.

NB: This only works with html tags, not custom components!

```jsx
const Button = styled.button`
  display: inline-block;
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  display: block;
`;

const TomatoButton = styled(Button)`
  color: tomato;
  border-color: tomato;
`;

export const ...{ 
render(
  <div>
    <Button>Normal Button</Button>
    <Button as="a" href="#">Link with Button styles</Button>
    <TomatoButton as="a" href="#">Link with Tomato Button styles</TomatoButton>
  </div>
);
}
```