

select  name, breed, weight, coalesce(weight - lag(weight, 1) over (partition by breed order by weight), 0) as weight_to_lose
 from cats 
order by weight

have to be the same type
select NAME, WEIGHT, breed, coalesce(cast(lead(weight, 1) over (partition by breed order by weight) as varchar), 'fattest cat') as next_heaviest
 from cats 
order by weight