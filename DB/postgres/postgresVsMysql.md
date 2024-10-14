# Small differences

## Top Vs limit

```sql
SELECT TOP 10 DISTINCT(surname)
FROM CD.MEMBERS
```

```SQL
SELECT DISTINCT(surname)
FROM CD.MEMBERS
LIMIT 10
```