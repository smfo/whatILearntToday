# Place child in container

Some times we want to place a child-component in a certain way relevant to the parent-component/container.


## Example

We want to place the arrow (StyledFlexRow), relative to the card container (StyledCardLink).

<img src="childPlacement.PNG" alt="drawing" width="250"/>

In order to do that we need to tag the child with `position: absolute` and `position: relative`. Then in the child component we can use `bottom, right, top and left` to place the child relative to the parent.

```jsx
const ArrowCardLink = (props: React.PropsWithChildren<OwnProps>) => {
	return (
		<StyledCardLink url={props.cardLink}>
			{props.children}
			<StyledFlexRow className="mt-32" halign="end">
				<Icon type="arrow" direction="right" className="ml-12" />
			</StyledFlexRow>
		</StyledCardLink>
	);
};

const StyledFlexRow = styled(FlexRow)`
	position: absolute;
	right: 30px;
	bottom: 30px;
`;

const StyledCardLink = styled(CardLink)`
	height: 200px;
	width: 348px;
	padding: 30px;
	position: relative;
`;
```