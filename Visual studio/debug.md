# Debugging

### Debugging controls
Step into F11
Step over F10
Step out Shift + F11: go back to the parent calling method

## Breakpoints

### Manage breakpoints
Debug -> Windows -> Breakpoints (Ctrl + Alt + B)
Opens a list of all the current breakpoints, active and inactive(Ctrl + F9).\
Allow for adding labels to the breakpoints, search after filename or label.\
Hit Count Column: show how many times the break points have triggered during execution.

### Call stack window (tab at the bottom of the screen)
Set a breakpoint and the call stack will tell you which files and methods the program has run through in order 
to get to this point in the code.

### Contitional breakpoints 
Set a break point, right click on it and chose "conditions". By setting conditions, the program will only break at the 
break point when these conditions are met.

## Windows

### Watch window
While debugging, rightclick on an object and choose "Add watch". The current value of the chosen object will be available
in the watch window regardless of the value being available in that scope or not. THe values will be monitored and updated
as the app conditues to run.

Watches also let you temporarily manipulate the values in the variables to test different scenarios.\
You can also add **nested values** to the watch window.

**Search**
Lets you search for property names and values in the watched values. The search depth lets you decide
how many levels down you want the search to look for these conditions. The watched variable itself does not count as a level.\
Use the arrows navigate between hits.

### Autos and locals window

**Autos** lets you see all the variables on the current line with their current value and type.

**Locals** shows the variables of the current scope. Usually the function being executed.

Both of these window update automatically as you move around in the code in debug, and support the search feature
described in "Watch window".

## Other handy tips

### Pin variable value 
Hover over the chosen variable to get its current value. Click the pin to the right of the value to pin it to this
point in the code. Can also be used on nested values

### Run til this point
While in debug mode, click the green play-icon that will appear to the left of the chosen line (while hovering there),
to run the code up until this point

### Quick watch 
Allows for expressions creation, with access to all the variable values at the given point in the code

Shift + F9                  //Running in debug, opens quickwatch (with selected element if any)