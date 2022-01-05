# Output

To pass values from a child to a parent component in React, we use callback functions.\
A function is passed to the child as a prop, and when the deciered value changes the function is called. The parent component will then execute the function, which can be doing something or just saving the new value.

```jsx
// Parent
const onButtonClick = (oppgaveNummer: number) => {
		context.setOppgaveId(oppgaveNummer);
		setShowModal(true);
};

return (
		<>
			<OppgaveButton
				handleButtonClicked={onButtonClick}
			/>

```

```jsx
interface OwnProps {
	oppgaveNummer: number;
	handleButtonClicked: () => void;
	buttonType: OppgaveResultType;
}

const handleButtonClicked = () => {
		props.handleButtonClicked(oppgaveNummer);
	};

return (
		<>
			<StyledButton
				onClick={handleButtonClicked}
			>
```