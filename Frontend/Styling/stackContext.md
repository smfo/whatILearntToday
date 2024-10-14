
# Stack context

A three-dimentional conceptualization of the z-axis of the html elements. The html elements occupy this space in priority order based on their attributes and placement in the file.\
The larger the z-index the closed higher priority the element has and the closer it is to the viewer.

Within a stacking context, child elements are stacked and prioritized. What is important is that these values only apply within the parent element. If a child element has a z-index of 1000 it will still be displayed behind another element in the same stacking context as the parent if this other element has priority 4 and the parent has priority 3.

This can be a problem in some cases. For example if you want to display a modual above every other element, but there is a header at the root context with priority above the modals parent node. To solve this we use [portals](../React/portal.md).