# Multiple children

Sometimes we need to place multiple JSX.elements in different locations in a child components. How will we do this when we only have one `props.children` to pass in?

## List of children

We can pass a list of children by passing multiple parent elements between the component tags.

2 children
```jsx
<InfoboxResultat>
	<div style={{ textAlign: "center" }}>
	</div>
	<div>
		<b>{TEXT.kpEps.oppfolgingsgrenseInfo.formalMedProve.delEnUthevetTekst} </b>
		{TEXT.kpEps.oppfolgingsgrenseInfo.formalMedProve.delTo}
	</div>
</InfoboxResultat>
```

Refer to the children by array index.
```jsx
interface IProps {
	children: [React.ReactNode, React.ReactNode];
}

export default function InfoboxResultat({ children }: IProps) {
	return (
		<Container className="oppfolgingsGrenseMainContainer" height="100%">
			<FlexRow style={{ alignItems: "stretch" }} width="100%" height="100%">
				<Container
					className="oppfolgingsGrenseContainer"
					getBackgroundColor={(color: ColorType) => color.primær.fersken}
				>
					{children[0]}
				</Container>
				<Container padding={4} paddingLeft={8} width="100%" height="80%">
					{children[1]}
				</Container>
			</FlexRow>
		</Container>
	);
}
```
### Cons

Might be less readable than using the slot pattern, specially if you don't already know how it works

## The slot pattern
In short, the idea behind thid pattern is to pass JSX.elements to the component as props.


```JSX
<Layout
  left={<Sidebar/>}
  top={<NavBar/>}
  center={<Content/>}
/>


function Layout(props) {
  return (
    <div className="layout">
      <div className="top">{props.top}</div>
      <div className="left">{props.left}</div>
      <div className="center">{props.center}</div>
    </div>
  );
}
```