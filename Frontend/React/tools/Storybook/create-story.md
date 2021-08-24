# Create story for a component

Create a story for the Tag compoents

```js
import React from 'react'
import Tag from './index'
export default {
    // Title of folder in storybook.
     title: 'Tag title',
    // Which component the story refers to.
     component: Tag
}
export const Basic = () => (
     <Tag />
)

// Second story, for a different way to use the component.
export const Second = () => (
     <Tag title="My second tag" />
)
```