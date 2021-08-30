# Props children

Code that is in between the two closing tags of a component will automaticall be assigned to the value `props.children`.

```js
<OppgaveKnapp key={oppgave.oppgavenummer}>
	<div>{oppgave.oppgavenummer}</div>
</OppgaveKnapp>


// In Oppgaveknapp
<StyledButton>
	{props.children}
</StyledButton>
```

Props.children will have the value `<div>{oppgave.oppgavenummer}</div>`

## Children vs regular prop
`props.children` is used when the structure of the child is not known beforehand. It might be a list or a picture.\
When the value that is passed in is to be used in the same place no matter what it is, say a title, we use `props` instead.