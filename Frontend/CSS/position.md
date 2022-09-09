# Position

The position tag is used to change the elements position in a document.\
The final location is determined by `top, right, bottom, left`.

The top left corner of the element is location `top: 0, left: 0` and this is the point we use to meassure movement.

## Static

This is the default value of element positioning. The element is positioned according to the normal flow of the document and the positioning properties has no effect.

```tsx
position: static;
```

## Relative

The element is positioned according to the normal flow of the document and then offset relative to itself. This does not affect other elements and the space allocated to the element is the same as when using static.

```tsx
position: relative;
top: 100%;
left: 40px;
```

## Absolute

The element is removed from the normal document flow, no space is allocated for it. It is positioned relative to its closest ancestor **with a position property**, if there is non it is positioned relative to the initial containing block.

The margin of absolute positioned elements **do not collapse** with other margins.

```tsx
position: absolute;
top: 100%;
left: 40px;
```

## Fixed

The element is removed from the normal document flow, no space is allocated for it. It is positioned relative to the initial containing block, except when an ancestor has a `transform, perspective or filter` property. In these cases the ancestor behaves as the containing block.

In printed documents, the element is placed in the same position on **every page**.

```tsx
position: fixed;
top: 100%;
left: 40px;
```

## Sticky

The element is positioned according to the normal flow of the document and the offset relative to its nearest scrolling ancestor and containing block based on the positioning properties. The offset does not affect any other elements.

```tsx
position: sicky;
top: 10px;
```