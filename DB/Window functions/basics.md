# Window function

A function where the input values are taken from a selection/window of one or more rows in the results set of a select statement.\
Put differently: used when you do not want all the rows to use the same information to calculate information, but you also want to keep the original row values available. See example vs. group by.

They are disinguishde from other SQL functions by the use of the OVER clause. Some times they also have a FILTER clause.

* Cannot use the DISTINCT keyword
* May only appear in the result set (SELECT) or in the ORDER BY clause
* does not alter the number of rows returned, simply adds a column containing the required information
* we have aggregate window functions and built in window functions

```sql
CREATE TABLE t0(x INTEGER PRIMARY KEY, y TEXT);
INSERT INTO t0 VALUES (1, 'aaa'), (2, 'ccc'), (3, 'bbb');


SELECT x, y, row_number() OVER (ORDER BY y) AS rank 
FROM t0 
ORDER BY x;
-- The following SELECT statement returns:
-- 
--   x | y | row_number
-----------------------
--   1 | aaa | 1         
--   2 | ccc | 3         
--   3 | bbb | 2         
-- 
```

Read about [row number](row_number.md)
This example adds a row, rank, based on the value in the window `ORDER BY y`.\
If we simply order by y we get this result:

```sql
SELECT *
FROM t0 
ORDER BY y;
-- The following SELECT statement returns:
-- 
--   x | y 
-------------
--   1 | aaa         
--   3 | bbb          
--   2 | ccc 
```

## Vs. group by

We have the following data:
```sql
--   Channel | Product | Revenue
-----------------------
--   Facebook | T-Shirts | 125         
--   Facebook | Pants    | 120         
--   Facebook | Pants    | 125         
--   LinkedIn | Shorts   | 140         
--   LinkedIn | Shorts   | 140         
--   Twitter  | Hats     | 90         
```

We want to calculate the total revenue for each channel. This can be done by using group by.

```sql
Select Channel, sum(Revenue) as Total_revenue
from ChannelStats
order by Channel

--   Channel  | Total_revenue
-----------------------
--   Facebook | 370         
--   LinkedIn | 280        
--   Twitter  | 90         
```

What happens now though is that we loose the information in the product column. Using window functions we can solve this.\
We create a window for each row that includes the revenue of all rows for the same channel and add a new row column with the resulting value.

```sql
Select *, sum(Revenue) OVER (Partition by Channel) as Total_revenue
From ChannelStats
Order by Channel

--   Channel | Product | Revenue | Total_revenue
-----------------------
--   Facebook | T-Shirts | 125   | 370      
--   Facebook | Pants    | 120   | 370      
--   Facebook | Pants    | 125   | 370      
--   LinkedIn | Shorts   | 140   | 280      
--   LinkedIn | Shorts   | 140   | 280      
--   Twitter  | Hats     | 90    | 90
```