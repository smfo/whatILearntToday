# Types and props

The styled components can accept props

```jsx
const Button = styled.button`
  // Adapt the colors based on primary prop
  background: ${props => props.primary ? "palevioletred" : "white"};
  color: ${props => props.primary ? "white" : "palevioletred"};
`;

render(
  <div>
    <Button>Normal</Button>
    <Button primary>Primary</Button>
  </div>
);
```

And limit which props are passed by using an interface
```jsx
interface StyledButtonProps {
	backgroundColor: string;
	borderColor: string;
}

const StyledButton = styled.button<StyledButtonProps>`
	display: inline-block;
    margin-right: 10px;
	width: 36px;
	height: 36px;

	background: ${props => props.backgroundColor};
	filter: drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.25));

	border-radius: 50%;
	border: 0.958588px solid ${props => props.borderColor};

	:hover {
		border: 3px solid ${props => props.borderColor};
	}
`;
```