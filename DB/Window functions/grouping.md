
select name, color, nth_value(weight, 1) over (partition by color order by weight) as weight_by_color
 from cats 
order by color, name


nth_value
if there is not yet a nth value of the group, the value is set to null
select distinct breed, nth_value(weight, 2) over (partition by breed order by weight RANGE BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING) imagined_weight
from cats 
order by breed