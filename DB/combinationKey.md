# Combination key

Some times we want to combine multiple columns in a table to create a primary key.

Example: We have a table with the columns DeliverySetId and Oppgaveposisjon. We only want to allow one occurence of every Oppgaveposisjon per DeliverySetId, this will not be reflected in a one column PK.

Instead we say that the combination of DeliverySetId and Oppgaveposisjon is the PK, and therefore have to be unique.

Known negatives with using a combination key:
- It takes longer to generate the index for the PK, as it depends on multiple columns. If the table has enought data, some million, it could get very slow

[Implementation in EF Core](../Backend/.NET/EFCore/Mapping/primaryKey.md)