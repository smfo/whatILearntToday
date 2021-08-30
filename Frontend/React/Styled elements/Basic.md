# Basic

Tags that are created purely to style an element. The element itself is a valis html element, but the style is defined to not have to mock around with `className` or other types of styling.

```js
npm install --save styled-components
```

Examples
```jsx
// Create a Title component that'll render an <h1> tag with some styles
const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

// Create a Wrapper component that'll render a <section> tag with some styles
const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;

// Use Title and Wrapper like any other React component – except they're styled!
export const ... {
render(
  <Wrapper>
    <Title>
      Hello World!
    </Title>
  </Wrapper>
);
}
```

Define the styled components outside the render function.Otherwise the styled components will be recreaded on every render.


More complex example
```jsx
interface StyledDropDownButtonProps {
	textPadding?: PaddingType;
	verticalAlignment?: VerticalAligmentType;
	color: DropdownColorStyle;
}

const StyledDropDownButton = styled.button<StyledDropDownButtonProps>`
	font-weight: 500;
	background-color: ${(props) => color.splitButton.getBackground(props.color).hex};
	width: 100%;
	height: 100%;
	border-style: none;
	cursor: pointer;

	:hover {
		background-color: ${(props) => color.splitButton.getItemOnHover(props.color).hex};
	}

	text-align: ${(props) => {
		switch (props.verticalAlignment) {
			case "left":
				return "left";
			case "center":
				return "center";
			case "right":
				return "right";
			default:
				return "left";
		}
	}};

	padding: ${(props) => {
		switch (props.textPadding) {
			case "standard":
				return rem(10);
			case "none":
				return "0";
			default:
				return rem(10);
		}
	}};

	:focus {
		outline-offset: -2px;
		outline: ${`${color.focusIndicator.hex} solid ${spacing.outline.width}`};
	}

	:focus:not(:focus-visible) {
		outline: none;
	}

	:focus-visible {
		outline-offset: -2px;
		outline: ${`${color.focusIndicator.hex} solid ${spacing.outline.width}`};
	}
`;
```