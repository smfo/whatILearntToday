
# Expression changed after it has been checked error
 
 ## Change detection in Angular
 What does Angular check during change detection:

 * Update Bound properties for all child components and directives
 * Call ngOnInit, OnChanges and ngDoCheck for all child components/directives
 * update the DOM for the current component
 * run change detection for the child components
 * call ngAfterViewInit for all child components/directives

 The "old" value is stored and the current value if compared to the one of the previous cycle. This additional check is only performed in development mode and is the reason this error is only thrown in development.
 * values passed down to child components are the same
 * values used to update the DOM elements are the same
 * perform the same checks for all child components

 ## Why do we get this exception
 Typically because the child component updates something in the parent component based on a value change in the child. 
 
 Let's say we are changing a value in the parent components html, this will trigger the exception because the value changed from the child component is triggered after the DOM update.\
 If the html change were done my the parent component itself, for example in ngOnInit, there would be no exception because ngOnInit is called before  the DOM changes.\ However, if the change where to be applied in ngAfterViewInit, we would get the exception.

 Real world examples are more complicated and some reasons for the error could be:
 * both parent and child uses the same service. a change excected by the child component updates a property in the parent component
 * the child component emits an event to the parent and some properties are updated. These properties are used as input bindings for the child component
 * the parent updates the DOM in ngAfterViewInit. This can also be subtle changes like adding another child component