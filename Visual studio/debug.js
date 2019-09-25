// Call stack window (tab at the bottom of the screen)
// Set a breakpoint and the call stack will tell you which files and methods the program has run through in order 
// to get to this point in the code.

// Contitional expression 
// Set a break point, right click on it and chose "conditions". By setting conditions, the program will only break at the 
// break point whene these conditions are met

// Pin variable value 
// Hover over the chosen variable to get its current value. Click the pin to the right of the value to pin it to this
// point in the code. Can also be used on nested values

// Run til this point
// While in debug mode, click the green play-icon that will appear to the left of the chosen line (while hovering there),
// to run the code up until this point

// Autos and locals window
// Autos lets you see all the variables on the current line with their current value and type
// Locals shows te variables of the current scope

// Watch window
// While debugging, rightclick on an object and choose "Add watch". The current value of the chosen object will be available
// in the watch window regardless of the value being available in that scope or not

// Quick watch 
// Allows for expressions creation, with access to all the variable values at the given point in the code

Shift + F11                 //Still running in debug, runs until returning from current function
Shift + F9                  //Running in debug, opens quickwatch (with selected element if any)