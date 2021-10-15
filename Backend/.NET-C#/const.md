# Const

A constant variable in C# is not the same as in JS. In JS `const` just means that the variable value cannot be changed.\
This is true for C# as well, however the variable value has to be an expression that can be fully evaluated at compile time. Meaning that the value is "ready to go" at compile time. It does not depent on any input from the user or anything the user clicks.

Essentially this means that contsants can be tracked to hardcoded values.

## Readonly
To create value that cannot be changed use the `readonly` property. These values can only be set in the constructor.
```C#
public class OppgaveViewModel
	{
		public string EpsOppgaveId { get; set; }
        public readonly string MaxScore;
		public List<PropertyViewModel> Properties { get; }

        OppgaveViewModel(string maxScores)
        {
            MaxScore = maxScores;
        }

    }
```

There is no equivalent to typescripts `const` for local variables (variables that are created within a method).