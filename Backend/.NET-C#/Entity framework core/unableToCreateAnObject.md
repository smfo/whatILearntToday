# Unable to create an object of type 'db'

Error:
```
Unable to create an object of type 'db'. For the different patterns supported at runtime see ...
```

This error may occure for any ef core commant if you are running the command from your data project, and this is not the api project for the solution. In this case ef core will not find any startup file and it will struggle. To solve this, reference the startup projects path after the given command using `-s`.

Example
```
\UDIR.Gjennomforingsdataservice.Data> dotnet ef migrations remove -s ..\UDIR.Gjennomforingsdataservice.API
```