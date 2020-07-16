
# Projecting

The main operation is `Select`.\
Select can be used to return some of the propertis in the sequenses, using 
anonymous typing. The examples show a shortcut for that that returns objects with
three properties, manufacturer, name and combined.

```C#
select new 
{
    car.Manufacturer
    car.Name
    car.Combined
}

Select( c => { c.Manufacturer, c.Name, c.Combined});
```

The select operator can also be replaced by explicit extension methods.

## SelectMany
This is a flattening operator.\
It can transform a collection of collections into one single collection containing all
the elements in the original collections.

```C#
// Where passangers is a list of people objects
.SelectMany(c => c.Passangers)
```