# LifeCycle

Component lifecycle

- Create
- Render
- Create and render children
- Prosess changes
- Destroy

## Hooks

OnInit: perform component initialization after retrieve data

// DOM elements render //

AfterViewInit: allows for js to make changes to the DOM elements after they have been created

OnChanges: Perform action after change to **input** properties

OnDestroy: Perform cleanup

Implement the interface for the lifecycle hook and create the function.

## Execute order

- Constructor
- Get input values
- OnInit/OnChanges
