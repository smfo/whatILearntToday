
# Aggregation
Ex. min, max, average

```C#
var query = 
    from car in cars
    group car by car.Manufacturer into carGroup
    select new 
    {
        Name = carGroup.Key
        Max = carGroup.Max(c => c.Combined),
        Min = carGroup.Min(c => c.Combined),
        Avg = carGroup.Average(c => c.Combined)
    } into result
    orderby result.Max descending
    select result;
```

Aggregate gives the values for max, min and avg in one loop, instead of itteration over the
data for each calculation.
```C#
var query =
    cars.GroupBy(c => c.Manufacturer)
        .Select(g =>
        {
            var results = g.Aggregate(new CarStatictics(),
                (acc, c) => acc.Accumulate(c),
                acc => acc.Compute())
            return new
            {
                Name = g.Key
                Avg = results.Average,
                Min = results.Min,
                Max = results.Max
            }
        })
        .OrderByDescending(r => r.Max);

public class CarStatistics
{
    public CarStatistics()
    {
        Max = Int32.MinValue;
        Min = Int32.MaxValue;
    }

    public CarStatistics Accumulate(Car car)
    {
        Count += 1;
        Total += car.Combined;
        Max = Math.Max(Max, car.Combined);
        Min = Math.Min(Min.car.Combined);

        return this;
    }

    public CarStatistics Compute()
    {
        Average = Total/Count;
        return this;
    }

    public int Max { get; set;}
    public int Min { get; set;}
    public int Total { get; set;}
    public int Count { get; set;}
    public double Average { get; set;}
}
```