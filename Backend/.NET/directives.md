# Directives

Directives specify settings that are used in the document and user-control compiler when the compiler process the page. In othe words, they are commands for the compiler that affects the compilation process. These gets processed before the actual compilation of the code starts.

Adding directives can lead to more or less warnings in the code.

Directives start with a #.

#nullable enable\
Sets the nullable annotation and warning contexts to enabled. If the compiler spots that a variable could be null, or a class defined variable is still null after the constructor is run, you will get an error

[Examples](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/preprocessor-directives)