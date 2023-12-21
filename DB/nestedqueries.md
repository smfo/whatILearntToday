# Nested queries

Some time we would like to get all rows from a table that matches a constraint in all rows with a certain contition in another table. This can be done using [cursors](cursor.md), but some times its better to use nested queries.

We do this on the form
```sql
SELECT *
FROM table
WHERE <value-to-match-nested-table> IN
      (
          SELECT *
          FROM table
          WHERE condition
      )
```

Example

```sql
DELETE FROM Losningsprosent
WHERE DeliverySetId IN
      (
          SELECT DISTINCT(DeliverySetId)
          FROM Delivery
          WHERE EpsDeliveryId IN
                (
                    SELECT EpsDeliveryId
                    FROM Execution
                    WHERE UserId IN (SELECT * FROM @fNr)
                )
      )
```