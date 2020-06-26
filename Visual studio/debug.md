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

### Contitional breakpoints 
Set a break point, right click on it and chose "conditions". By setting conditions, the program will only break at the 
break point when these conditions are met.

### Trace points
Offer information about the history of what have happened.\
Set a breakpoint, right click and select actions. Log a message to the output window. This can be done on all occurances or
given a specific condition set in the breakpoint.

Use {} to print variable values.

### Call stack window (tab at the bottom of the screen)
Set a breakpoint and the call stack will tell you which files and methods the program has run through in order 
to get to this point in the code.

Right clicking ang chosing "show external code" will also show any package functions that are called.

**For enterprice**
Right click -> "Show call stack on code map"\
Displays a visual representation of the call stack.

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

### Immediate window
Lets you test different aspects of the code by typing commands, manage variables and execute expressions.
* Get variable values by typing the variable name
* Change a variable value by typing variable name = value
* Run function by typing FunctionName(arguments). These arguments can be the modified versions you have previously
made in the window. You can run both the function where the breakpoint is placed and submethods
* '>' gives access to the debug functions available. ex: Debug.Print

Use >Debug.Print Function(args) to run methods and imidiatly display the output result.\

To get access to this we first need to use visual studio in debug mode in the desiered file.

## Debug and debugger
Classes that programmatically influence the code. These are written in the code and executes every time the code runs
Some examples:
* Debug.Writeline()
* Debugger.Break();

**DebuggerDisplay**
```C#
[DebuggerDisplay("First Name = {FirstName} Approved = {Approved}")]
public class LoanApplicationResult{}

//controller
public IActionResult Index(int start, int length = 2)
        {
            var loanResults = this.loanApplicationRepo.GetLoanApplicationResults();

            var totalRecords = loanResults.Count;

            var filteredLoanResults = loanResults.Skip(start).Take(length).ToList();

            foreach(var result in filteredLoanResults)
            {
                if(result.LoanTerm > 30)
                {
                    result.LoanTerm = result.LoanTerm / 12;
                }
            }

            Debugger.Break();
```
When hovering over loanResults, that gets its results values from the LoanApplicationReult class, each value in the 
array will now display on a format `First Name = {FirstName} Approved = {Approved}`. Inseted of displaying their type.

## Other handy tips

### Pin variable value 
Hover over the chosen variable to get its current value. Click the pin to the right of the value to pin it to this
point in the code. Can also be used on nested values.

### Skip code, run code again
Drag the yellow arrow in the margin around to device what code to run next, this shanges the execution point in the code. 
This can be used to skip code or rerun previous code. Right clicking and selecting "Set as next statement" achives a similar
effect.

### Run til this point
While in debug mode, click the green play-icon that will appear to the left of the chosen line (while hovering there),
to run the code up until this point. Or right click and select "Run to cursor".

### Quick watch 
Allows for expressions creation, with access to all the variable values at the given point in the code. 
Right click or (Shift + F9) to open.