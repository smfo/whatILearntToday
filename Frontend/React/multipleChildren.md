# Multiple children

Sometimes we need to place multiple JSX.elements in different locations in a child components. How will we do this when we only have one `props.children` to pass in?

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