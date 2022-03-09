# ISNULL

ISNULL lets you return an alternative vaule, if the chosen value is NULL.

This example uses GjennomforingStopp for the query if Skaringsfrist is NULL.

```SQL
 SELECT *
 FROM [Prove].[Prove]
 WHERE ISNULL(Skaringsfrist, GjennomforingStopp) > @dt
```