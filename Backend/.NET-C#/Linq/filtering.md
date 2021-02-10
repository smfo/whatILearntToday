
# Filtering

## Multiple filters

```C#
where car.Manufacturer == "BMW" && car.Year == 2016

.Where( c => c.Manufacturer == "BMW" && c.Year == 2016)
```

## First
First is an operator that is available using the extension syntax.

```C#
var top = 
    cars.Where(c => c.Manufacturer == "BMW" && c.Year == 2016)
    .OrderByDescending(c => c.Combined)
    .ThenBy(c => c.Name)
    .Select(c => c)
    .First();
```
This differs from using Take(1) on a couple of points
* Returns a single object, not a list that can be itterated over
* the result can now be worked on as a direct object

First can also be used as a filtering method instead of Where. Be carefull of placement!
```C#
var top = 
    cars.
    .OrderByDescending(c => c.Combined)
    .ThenBy(c => c.Name)
    .Select(c => c)
    .First(c => c.Manufacturer == "BMW" && c.Year == 2016);
```

Query syntax
```C#
var query =
    (from car in cars
    orderby car.Combined ascending, car.Nameascending
    select car).First();
```

If there is no match for the criteria, the operator throws an exception.\
To avoid this use `FirstOrDefault`. This will return the default value of the type worked with.

## Last
Use the same way as `First`. There is also a `LastOrDefault` operator.