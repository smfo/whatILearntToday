
# CSV to objects

* Filter out unwanted data (lines)
* Transform each line into an object

```C#
static void Main(string[] args)
{
    var cars = ProcessFile("fuel.csv");
}

private static List<Car> ProcessFile(string path)
{
    return
    File.ReadAllLines(path)     //from System.IO, returns IEnumerable
        .Skip(1)
        .Where(line => line.Length > 1)
        .Select(Cars.ParseFromCsv) 
        //transform the desiered line into the correct object
        //Use a method in the class, a lambda expression or a private method in the program
        .ToList();
}

// var query = 
//     from line in File.ReadAllLines(path),Skip(1)
//     where line.length > 1
//     select Car.ParseFromCsv(line)

// return query.ToList();

//In cars class
internal static Car ParseFromCsv(string line)
{
    var columns = line.Split(',');

    return new Car
    {
        Year = int.Parse(columns[0]),
        ...
        ...
    };
}
```