# Align text with icon, horizontally

When a div is next to a text, the text is not always alligned with the middle of the div, and might therefore look off.\
We can fix this by aligning the text.

```js
const StyledText = styled.div`
	display: inline-block;
	vertical-align: middle;
`

// Where StyledRectangle is a div and StyledText is a p
<StyledRectangle
				backgroundColor={props.backgroundColor || "#F3F5F8"}
				borderColor={props.borderColor || "#000000"}
			>
				{props.children}
			</StyledRectangle>
			<StyledText>{props.text}</StyledText>
		</>
```

Other values for vartical-align:
* bottom
* baseline
* text-bottom
* text-top
* top\
etc..