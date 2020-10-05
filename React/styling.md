# Styling React components

## Inline
Using a style js attribute in the JSX, saving style values as constaints.

```JSX
const styles = {
    color: 'red',
    background: 'blue'
}

<button style={styles}> Click button </button>
```
Does not support psudo selectors, :hover etc, or animations, this has to be done in js.

## CSS-inJs
Description of a set of CSS libraries. Similar to inline styling, but also offers @media, query styles and
animations. There are lots of libraries to choose from.

Example library, styled components.\
Allow for multiple layers in the styling, unline inline. Support psudo selectors and 
The styling constants can now be used as
React components
```javascript
import styled from 'styled-components'

const Container = styled.section`
    position: relative;
    background: 'blue';
`

const Header = styled.header`
    position: relative;
    color: #fff;

    h2 {
        margin: 0 0 0 10em;
    }
`

return(
    <Container>
        container content
        <Header>
            <h2>Header with styling here</h2>
        </Header>
    </Container>
)
```

## CSS stylesheets
The default option, but not ideal. All styling is global.

## CSS modules
Import seperate style files to the components. Supports styling isolation and explicit dependencies.