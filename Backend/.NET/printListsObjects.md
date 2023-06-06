
# Print more complex types

Do this to prevent printing `System....`

## List of string
Separate the elements with what you see fit. `\t` for tab, `\n` for linebreak.

```C#
string[] participantInfo = line.Split(",");
Console.WriteLine(String.Join("\t", participantInfo));
```