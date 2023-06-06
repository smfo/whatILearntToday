
# Joining

## Query syntax
Join is much like From in the sense that you have to specify an element from a collection of elements.
In addition you have to tell Join how to combine the two datasources.

```C#
var query = 
    from car in cars
    join manufacturer in manufacturers
        on car.Manufacturer equals manufacturer.Name
    orderby car.Combined descending
```

If linq does not find any information to join on, that element will be excluded from the result.

## Extension method syntax
Chose one outer sequense, the datasource the methods are being applied to, and one inner sequense, the datasource
specified in Join. Typically we want to use the smaller dataset as the inner sequense.\
The next parameter is the outerKeySelector. What is the joining field for the outer selector. This is followed by
the innerKeySelector.\
The last parameter is the resultSelector. The IEnumberable can only return a list of one type of object. After the join
we no longer have access to Car as a type. Therefore we need to provide the new projection to work with after this point.

```C#
var query =
    cars.Join(manufacturers,  
        c => c.Manufacturer,
        m => m.Name,
        (c, m) => new
        {
            m.Headquarters,
            c.Name,
            c.Combined
        })
    .OrderByDecending(c => c.Combined);
```

It is possible to keep all the data from both sources without spelling out all the fields.
```C#
var query =
    cars.Join(manufacturers,  
        c => c.Manufacturer,
        m => m.Name,
        (c, m) => new
        {
            Car = c,
            Manufacturer = m
        })
    .OrderByDecending(c => c.Car.Combined);
```

## Join on multiple columns
Specify an object that contains both columns to join on. Create a anonymous type or use a new object.\
The fields to join needs to have the same name, henche `Manufacturer = manufacturer.Name`.

```C#
var query = 
    from car in cars
    join manufacturer in manufacturers
        on new {car.Manufacturer, car.Year} 
        equals new { Manufacturer = manufacturer.Name, manufacturer.Year}
    orderby car.Combined descending;


var query =
    cars.Join(manufacturers,  
        c => new {c.Manufacturer, c.Year},
        m => new { Manufacturer = m.Name, m.Year},
        (c, m) => new
        {
            m.Headquarters,
            c.Name,
            c.Combined
        })
    .OrderByDecending(c => c.Combined);
```

## GroupJoin
See Grouping