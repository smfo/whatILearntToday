
# Grouping
A grouping will take all the values in a data source and place then in a specified bucket.
This bucket value will be available as a Key, and the number of elements as Count

## Query syntax
Into: The bucket elements has to be assigned to a type in order to work with then later in the 
query, as the bucket is not of type Car.

```C#
var query =
    from car in cars
    group car by car.Manufacturer.ToUpper() 
        into manufacturer //What type to assign the bucket elements
    orderby manufacturer.Key
    select manufacturer;

foreach (var result in quary)
{
    Console.WriteLine(group.Key);
    //Access the actual elements in the buckets
    foreach (var car in group.OrderByDescending(c => c.Combined).Take(2))
    {
        Console.WriteLine($"\t{car.Name} : {car.Combined}");
    }
}
```

## Extension method
No need to assign a type to the buckets using the extension method syntax.

```C#
var query =
    cars.GroupBy(c => c.Manufacturer.ToUpper())
    .OrderBy(g => g.Key);
```

## GroupJoin
```C#
var query = 
    from manufacturer in manufacturers
    join car in cars on manucafturer.Name equals car.Manufacturer
        into carGroup //each manufacturer will be associated with a carGroup
    orderby manufacturet.Name
    select new
    {
        Manufacturer = manufacturer,
        Cars = carGroup
    };

var query = 
    manufacturers.GroupJoin(cars, m => m.Name, c => c.Manufacturer,
        (m, g) => new
            {
                Manufacturer = m,
                Cars = g
            })
    .OrderBy(m => m.Manufacturer.Name);
```