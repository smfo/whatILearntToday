
# Rows between

We do not have to use value as conditions for making windows, we can also use row placements. We do this by combining `ORDER BY`, `PRECEDING`, `CURRENT ROW`, `FOLLOWING` and `ROWS BETWEEN`.

ROWS lets us specify rows for the calculations we want to perform. The clause specify the window frame in relation to the current row.

`ROWS BETWEEN lower_bound AND upper_bound`

Boundaries:
* UNBOUNDED PRECEDING - All rows before the current row
* n PRECEEDING - n rows before the current row
* CURRENT ROW
* n FOLLOWING - n rows after the current row
UNBOUNDED FOLLOWING - All rows after the current row


## NB

The default is to always include `CURRENT ROW` as one of the endpoints, meaning:

* UNBOUNDED PRECEDING is the same as BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW.
* n PRECEDING is the same as BETWEEN n PRECEDING AND CURRENT ROW.
* n FOLLOWING is the same as BETWEEN CURRENT ROW AND n FOLLOWING.
* UNBOUNDED FOLLOWING is the same as BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING

### Order by, full range
* Without ORDER BY, the default frame is ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
* With ORDER BY, the default frame is RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW

Meaning to include the full range of the partition when using `order by` we use this rows clause: `rows between unbounded preceding and unbounded following`.

See last example.

## Example

Find the average temperature for each city the last three days.

Because we want to find a value using groups, in this case city, we first partition the result set. Because the order of the rows also matter we order the partition as well.

```sql
select city, date, temperature, avg(temperature) over (partition by city order by date rows between 2 preceding and current row) as 3day_average
from weather
order by city, date
```

## First_value() and Last_value()

Built in functions that select the first or last value given a specific window.

```sql
-- Include columns with the first and last values for new subscribers in each social network
SELECT social_network, date, new_subscribers,
    FIRST_VALUE(new_subscribers) OVER(
      PARTITION BY social_network
      ORDER BY date) AS first_day,
    LAST_VALUE(new_subscribers) OVER(
      PARTITION BY social_network
      ORDER BY date
    --   Because we use order by we need to use both preceding and following to include the whole partition
      ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING) AS last_day
FROM subscribers
ORDER BY social_network, date;
```