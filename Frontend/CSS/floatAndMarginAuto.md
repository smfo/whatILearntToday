# Float and margin-auto

## Float

Float is used to move **block** elements inside their block parent and allow other block elemets to float around them.

```css
float: right;
float left;
```

The following elements will stick themselves to the previous item that wasn't floated.

## Align

We can use align to horizontally center **block** elements.

`margin: 0 auto;`

Inline elements are centered with `text-align`

## Clear float && hiding overflow

These are methods to make following components ignore float elements that come before them in the page flow. (Not really cause they are not in the flow anymore..). Instead of floating around the elements, it appears after them.

```css
clear: both;
clear: left;
clear: right;
```

If we want the height of a container to be registered, however this only contains floating elements, we cannot use `clear`. Instead we use `overflow: hidden`.

When is this an issue? For example if you want to give the parent element of float elements a background color, you want a border for the parent element etc..