
# Content child

This is a parameter decorator that configures a content query. It is used to get the first element or directive in the DOM content that matches the selector. If the DOM changes and a new child matches the selector, the property will be updated.

Content queries are set before ngAfterContentInit is called and it does not retrieve elements or directives in other components' templates.

See more in [viewChild](viewChild.md).