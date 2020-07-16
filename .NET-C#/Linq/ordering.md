
# Ordering

Using two "OrderBy" operations in on the same data undoes the work done by the first operation
and only solves by the last ordering.
Using the extension method syntax use `ThenBy`.\
Using the query syntax liste the multiple sorting operators.

```C#
var query = cars.OrderByDescending(car => car.Combined)
                .ThenBy(car => car.Name);

var query =
    from car in cars
    orderby car.Combined ascending, car.Nameascending
    select car;
```

Theres also `Reverse` if using the extension method.