
# Partition by

This is the clause that devides the result set into partitions, meaning all rows that have the same value for all terms we want in our window definition. If there is no PARTITION Y clause, the entire result set of the query is used to calculate the value. The window-function processing is performed seperatly for each partition.

In this example the partitions are created based on the Channel value. There are three partitions.

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