# Select the N rows

Select the N top rows for a value of column.

## Top row

Select the whole row for the person with the largest address number.

We do this by finding the largest address number, then joining this table with itself using an identifier.

```sql
select *
from person as p1
inner join (
    select id, MAX(address_number)
    from person
) p2 on p1.id = p2.id
```

## Top n

Select the country, city and population of the 3 cities with the highest population.

Sort by population and select the first 3 rows.

```sql
select country, 
       city,
       population 
from cities 
order by population desc 
limit 3
```

or if the program does not support limit

```sql
select top 3 country, 
       city,
       population 
from cities 
order by population desc 
```

## Top n by partition

Select the top 3 cities by population for every country.

First we partition the list by the country, then we find the top 3 for each partition.

```sql
select * from (
    select country, 
           city,
           population, 
           row_number() over (partition by country order by population desc) as country_rank 
    from cities) ranks
where country_rank <= 2;
```

### Row number

Returns the sequential number of a row within a partition in a result set.