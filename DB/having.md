
# Having

HAVING is like WHERE, except where as WHERE operates on every single row of the result set, HAVING only operates on aggregated rows. Rows that have already been grouped based on some condition. Because of this HAVING needs to be placed after the GROUP BY clause in the statement.\
It is possible to have both a WHERE clause and a HAVING clause in the same query.

```sql
SELECT Employees.LastName, COUNT(Orders.OrderID) AS NumberOfOrders
FROM Orders
INNER JOIN Employees ON Orders.EmployeeID = Employees.EmployeeID
WHERE LastName = 'Davolio' OR LastName = 'Fuller'
GROUP BY LastName
HAVING COUNT(Orders.OrderID) > 25;

-- List the total number of orders for every employer with the last name Davolio or Fuller, that has more than 25 orders.
```

## Alias

In the example above, why did we not write the HAVING clause like this `HAVING NumberOfOrders > 25`?\
The HAVING clause is evaluated before the SELECT - so the server doesn't yet know about that alias.