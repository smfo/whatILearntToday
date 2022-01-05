# Bracket notation

Bracket notation lets you access a field in on object without knowing the name of that field. Meaning the field name is a variable and you can use the same code to access various fields.

To be allowed to use a string to find a field name, we have to follow an interface specifying that the field name is a string.
```js
interface IFoo {
    [key: string]: string[]
}

const lotsOfStuff {
    food: "Banana",
    location: "London",
    animal: "Tiger"
}

var fieldName = "Tiger";

console.log(lotsOfStuff[fieldName])

// Adding a key/value pair
lotsOfStuff["Snacks"] = "Chips";
```

## Nested objects

This can be used in any of the objects levels.
```js
interface AllButtonTypes {
	[key: string]: ButtonProps
}

export const oppgaveButtons: AllButtonTypes = {
	correct: {
		borderColor: "#4C9A72",
		backgroundColor: "#B5DDC2",
		hoverColor: "#7DBF9D",
		icon: <Icon type="checkmarkSmall" />
	},
	incorrect: {
		borderColor: "#000000",
		backgroundColor: "#F3F5F8",
		hoverColor: "#B2BFD2",
		icon: <Icon type="line" />
	}
};

	// Use object key as string
	const buttonProps: ButtonProps = oppgaveButtons[props.buttonType];

    const backgroundColor = buttonProps.backgroundColor;
```

This example might give an error (depending on the linting rules) saying `"object access via string literals is disallowed"`.
If you get this error, just rewrite to passing the object key as a variable instead of a string.

```js
	const buttonProps: string = props.buttonType;

    const backgroundColor = oppgaveButtons[buttonProps].backgroundColor;
```