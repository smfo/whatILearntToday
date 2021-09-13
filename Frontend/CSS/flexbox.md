# Flexbox

Used to place elements in rows or columns, flexible or not.

Create a container to house all the elements
the css related to this container will deside the orientation and flow of the elements.

```CSS
.container{
    display: flex;
    flex-direction: row | row-reverse | column | column-reverse;
    /* should the elements by all means try to fit into one line or should they wrap across multiple lines */
    flex-wrap: nowrap | warp | warp-reverse;
    /* combining direction and wrap ex. flew-flow: row wrap; */
    flex-flow: <flex-direction> <flex-warp>;
    justify-content: flex-start | flex-end | center | space-between | space-around | space-evenly;
}
```

- flex-start (default): items are packed toward the start of the flex-direction.
- flex-end: items are packed toward the end of the flex-direction.
- start: items are packed toward the start of the writing-mode direction.
- end: items are packed toward the end of the writing-mode direction.
- left: items are packed toward left edge of the container, unless that doesn't
  make sense with the flex-direction, then it behaves like start.
- right: items are packed toward right edge of the container, unless that doesn't
  make sense with the flex-direction, then it behaves like start.
- center: items are centered along the line
- space-between: items are evenly distributed in the line; first item is on the start
  line, last item on the end line
- space-around: items are evenly distributed in the line with equal space around them.
  Note that visually the spaces aren't equal, since all the items have equal space on both sides.
  The first item will have one unit of space against the container edge, but two units of space
  between the next item because that next item has its own spacing that applies.
- space-evenly: items are distributed so that the spacing between any two items
  (and the space to the edges) is equal.

## Flex elements

```CSS
.item{
  /* by default items follow the source order, however this can be changed to follow the order specified */
    order: <integer>;
    /* should some of the elements get more space than others */
    flex-grow: <number>;
    flex-shrink: <number>;
}
```

Documentation [here](https://css-tricks.com/snippets/css/a-guide-to-flexbox)
