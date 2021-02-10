
# Quantifying data

## Any
This is a quantifier that returns a boolean. The operator simple tells you if
there is a sequenses in the dataset that matches the Func.

```C#
var result = cars.Any(c => c.Manufacturer == "Ford");
```

## All
This is a quantifier that returns a boolean. The operator simple tells you if
all sequenses in the dataset that matches the Func.

```C#
var result = cars.All(c => c.Manufacturer == "Ford");
```

## Contains
Does the same as `Any` but accepts an object instead of a func. However Contains
might be slightly faster depending on the data structure.