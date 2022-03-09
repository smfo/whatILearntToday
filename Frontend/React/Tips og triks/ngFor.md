## Using map

When looping through variables we use map. The mapping has to return something, therefore you should first check that the array is not empty.\
Both in jsx and the javascript we can return both html and objects.

```javascript
{valgtElev.oppgaverMedRiktigSvar.map(oppgave => (
	<OppgaveKnapp backgroundColor="#B5DDC2" borderColor="#4C9A72" key={oppgave.oppgavenummer}>
		<div>{oppgave.oppgavenummer}</div>
		<CheckmarkIcon />
    </OppgaveKnapp>
))}
```

## Returning object

Some times you want to return an object from map.\
You can return the object by using `({})`.

```js
<DropDownList
	items={students.map((student, idx) => ({
		id: String(idx),
		label: student,
		onChange: updateSelectedItem
	}))}
/>
```