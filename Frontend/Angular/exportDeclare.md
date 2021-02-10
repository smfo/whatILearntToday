# Declare as a keyword

The classes real implementation is somewhere else, possibly a library

## Add more when I know more!

Why do we need the declare in this statement?

```JS
export declare class Actions {
    ...
}
```

Answer: Declare vs. var

var creates a new variable. Declare is used to tell TypeScript that the variable has been created elsewhere. If you use declare, nothing is added to the JavaScript that is generated - it is simply a hint to the compiler.

For example, if you use an external script that defines var externalModule, you would use declare var externalModule to hint to the TypeScript compiler that externalModule has already been set up.
