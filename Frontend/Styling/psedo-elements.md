# Psedo-element

A specific keyword that allows you to style a specific part of the element selected by using a CSS selector. They are very usefull when you want to style an element withoug adding CSS classes or IDs.

::first-line, ::first-letter, ::before, ::after

### Content

The content value, the element we want to style, can contain
* A string
* A counter, `counter(li)`
* An image, `url(/path/to/image.png)`
* An empty string

You **cannot** insert an HTML element into the content attribute.

## ::Before and ::After

These are psedo-elements that can add content before or after content, to decorate it. Examples are * for buletpoints or icons before or after a link.

```css
div::before {
	// CSS rules
}

/* Add styling to class link */
.link::before {
	// CSS rules
}
```

```css
<a href="https://careerkarma.com">This is a link to the Career Karma webpage.</a>

styles.css

a::before {
	content: "🔗";
}
```

```css
<a href="/" class="label">Go to the Hansons Bakery homepage.</a>

styles.css

.label {
	border: 1px solid black;
}

.label::after {
	content: " This page shows off our baked goods menu.";
	background-color: orange;
}
```

More complex example

<img src="before.PNG" alt="drawing" width="250"/>

```css
.bubble{
  position: relative;
  padding: 15px;
  margin: 1em 0 3em;
  color: #000;
  background: #f3961c;
  border-radius: 10px;
  background: linear-gradient(top, #f9d835, #f3961c);
}

.bubble:after {
  content: "";
  display: block; 
  position: absolute;
  bottom: -15px;
  left: 50px;
  width: 0;
  border-width: 15px 15px 0;
  border-style: solid;
  border-color: #f3961c transparent;
}
```

## Styled components

In styled components all selectors that are initialised by `::` in css become `&:`. They are not their own styled component, but are placed inside that styled component of the tag they belong to.

```tsx
	<StyledText key={text} getColor={c => c.støttefarge.hvit}>
		{text}
	</StyledText>

const StyledText = styled(Text)`
	${margin("bottom", 12)};

	&:last-child {
		${margin("bottom", 0)};
	}

    // &:before {
    //     ...
    // }
`;
```