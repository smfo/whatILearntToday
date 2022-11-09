# String agg

`String_agg` can be used instead of the old workaround of `STUFF((concat(',', strings) FOR XML PATH('')), 1, 2, '')`, where string is a `concat` starting with a separation character.

For sql server 17 and up.

```sql
STRING_AGG ( expression, separator ) [ <order_clause> ]

-- Using string_agg
STRING_AGG(
	CONVERT(NVARCHAR(MAX), CONCAT('(''', r.FNr,''', ','''',r.EpsDeliveryId, ''')')),', ')

        FROM (SELECT *
            FROM @rows
            ORDER BY FNr OFFSET @p ROWS FETCH NEXT @pageSize ROWS ONLY) r;
```

## Stuff, Concat and for XML path('')

This is what we use `String_agg` to replace.

Get the result of each row separated with `,` and return them using `for xml path('')`. This will give us all results, however the output will start with `,`. To remove this we use `Stuff` to replace the first character in the result with an empty string.

```sql
STUFF( 
 (
	SELECT CONCAT(', (row result)')
        FROM ...
        FOR XML PATH('')
 ), 1, 2, ''
);

STUFF( 
 (
	SELECT CONCAT(', (''', r.FNr,''', ','''',r.EpsDeliveryId, ''')')
        FROM (SELECT *
            FROM @rows
            ORDER BY FNr OFFSET @p ROWS FETCH NEXT @pageSize ROWS ONLY) r
        FOR XML PATH('')
 ), 1, 2, ''
);
```

```xml
<!-- Old result -->
, d073ae10e10b007, 41b0c157cf0501012515525, f7541de8ea6501015214410, 5c0deb206adb01018219049,

<!-- New result -->
 d073ae10e10b007, 41b0c157cf0501012515525, f7541de8ea6501015214410, 5c0deb206adb01018219049,
```


## Stuff
`Stuff` takes a string, and replaces parts of it, from `start` to the set `length`.

```sql
STUFF(string, start, length, new_string)

SELECT STUFF('SQL Tutorial', 1, 3, 'HTML');
<!-- Output -->
HTML Tutorial
```

## For XML

This is used to get output of the query xml friendly instead of one row per output row in a table.\
There are a couple of different modes

Raw, Auto, Path, Explicit

### Auto

Creates a root tag with the table name and each sql field in the select as parameters

```sql
SELECT [EpsDeliveryId],
  [UserId]
  FROM [dbo].[Delivery]
  for xml auto

<dbo.Delivery EpsDeliveryId="d073ae10e10b" UserId="007"/><dbo.Delivery EpsDeliveryId="41b0c157cf05" UserId="01012515525"/><dbo.Delivery EpsDeliveryId="f7541de8ea65" UserId="01015214410"/><dbo.Delivery EpsDeliveryId="5c0deb206adb" UserId="01018219049"/><dbo.Delivery EpsDeliveryId="3cd52097d900" UserId="01047648188"/><dbo.Delivery EpsDeliveryId="21ccb1a5c7d7" UserId="01055838352"/><dbo.Delivery EpsDeliveryId="2e7ef5514282" UserId="01055838352"/><dbo.Delivery EpsDeliveryId="6b2d7eefa014" UserId="01055838352"/><dbo.Delivery EpsDeliveryId="ea4af6d81526" UserId="01055838352"/><dbo.Delivery EpsDeliveryId="5ce24bca1df7" UserId="01058835109"/><dbo.Delivery EpsDeliveryId="7a384608d4be" UserId="01058835109"/><dbo.Delivery EpsDeliveryId="47b9f062a77d" UserId="01065214470"/><dbo.Delivery EpsDeliveryId="1ee326892e6f" UserId="01070140213"/>
```

### Path

`Path('root tag name')`

Creates a root tag of the given name, that wrapps the selected fields. The selected fields are displayed as tags with their value as the tag content.

```sql
SELECT [EpsDeliveryId], [UserId]
  FROM [dbo].[Delivery]
  for xml path('hey')

  <hey><EpsDeliveryId>d073ae10e10b</EpsDeliveryId><UserId>007</UserId></hey>
  <hey><EpsDeliveryId>41b0c157cf05</EpsDeliveryId><UserId>01012515525</UserId></hey>
  <hey><EpsDeliveryId>f7541de8ea65</EpsDeliveryId><UserId>01015214410</UserId></hey>


<!-- Using aliases -->
SELECT [EpsDeliveryId] + [UserId] as [test]
  FROM [dbo].[Delivery]
  for xml path('hey')

<hey><test>d073ae10e10b007</test></hey>
<hey><test>41b0c157cf0501012515525</test></hey>
<hey><test>f7541de8ea6501015214410</test></hey>
<hey><test>5c0deb206adb01018219049</test></hey>

<!-- Using an empty root -->
SELECT [EpsDeliveryId], [UserId]
  FROM [dbo].[Delivery]
  for xml path('')

  <EpsDeliveryId>d073ae10e10b</EpsDeliveryId><UserId>007</UserId>
  <EpsDeliveryId>41b0c157cf05</EpsDeliveryId><UserId>01012515525</UserId>
```

If there is no name for the selected fields, in case the value is a result of a function and has been given no alias, there will be no tags, only the values will be returned.

```sql
SELECT [EpsDeliveryId] + [UserId]
  FROM [dbo].[Delivery]
  for xml path('')

  d073ae10e10b00741b0c157cf0501012515525f7541de8ea65010152144105c0deb206adb010182190493cd52097d9000104764818821
```

Not very useful. See "Stuff, Concat and for XML path('')" to see how it can be used.