
# Linq to XML
System.Xml.Linq\
Contains classes for Xml, starting with X.

xDocument, XElement, XAttribute

## CSV to XML

Want to create this XML structure
```XML
<Cars>
    <Car>
        <Name>abc</Name>
        <Combined>21</Combined>
        ...
    </Car>
    ... more cars
</Cars>
```

To view the XML file after running program:\
Solution expøorer -> Show all files -> bin -> Debug -> open xml file\
This file will update automatically after every run.

### Element oriented approach
```C#
var records = ProcessCars("fuel.csv");

var document = new XDocument();
var cars = new XElement("Cars");

foreach (var record in records)
{
    var car = new XElement("Car");
    var name = new XElement("Name", record.Name);
    var combined = new XElement("Combined", record.Combined);

    car.Add(name);
    car.Add(combined);

    cars.Add(car);
}

document.Add(cars);
document.Save("fuel.xml");
```

### Functional approach

```C#
var records = ProcessCars("fuel.csv");

var document = new XDocument();
var cars = new XElement("Cars",
    from record in records
    select new XElement("Car",
                new XAttribute("Name", record.Name),
                new xAttribute("Combined", record.Combined)));

// foreach (var record in records)
// {
//     var car = new XElement("Car",
//                 new XAttribute("Name", record.Name),
//                 new xAttribute("Combined", record.Combined));

//     cars.Add(car);
// }

document.Add(cars);
document.Save("fuel.xml");
```

## Query XML

```C#
var document = XDocument.Load("fuel.xml");

//Car returns an IEnumerable, meaning we can use Linq to query the information
var query =
    from elemen in document.Element("Cars").Element("Car")
    where element.Attribute("Manufacturer").Value == "BMW"
    select element.Attribute("Name").Value;

foreach (var name in query)
{
    Console.WriteLine(name);
}
```

**Optional attributes**
If there are no elements that contain this attribute we will get an exception while running.

```C#
// using ? return null if there is no matching attribute
var query =
    from elemen in document.Element("Cars").Element("Car")
    where element.Attribute("Manufacturer2")?.Value == "BMW"
    select element.Attribute("Name").Value;
```

**Decendants**
Gives any element in the XML matching the name, no matter where it is placed in the hierarchy.\
Risk picking up elements you don't want.

```C#
var query =
    from elemen in document.Descendants("Car")
    where element.Attribute("Manufacturer2")?.Value == "BMW"
    select element.Attribute("Name").Value;
```

## XML namespaces
```C#
var records = ProcessCars("fuel.csv");

var document = new XDocument();
var cars = new XElement("Cars");

foreach (var record in records)
{
    var car = new XElement("Car");
    var name = new XElement("Name", record.Name);
    var combined = new XElement("Combined", record.Combined);

    car.Add(name);
    car.Add(combined);

    cars.Add(car);
}

document.Add(cars);
document.Save("fuel.xml");
```

### Functional approach (xmlns)
Queries have to be rewritten to work with the given namespace.\
The namespace has to be added to all elements.

```C#
var records = ProcessCars("fuel.csv");

var ns = (XNamespace) "http://pluralsight.com/cars/2016";
var document = new XDocument();
var cars = new XElement(ns + "Cars",
    from record in records
    select new XElement(ns + "Car",
                new XAttribute("Name", record.Name),
                new xAttribute("Combined", record.Combined)));

document.Add(cars);
document.Save("fuel.xml");
```

Elements does not have to be in the same namespace as their parent.
```C#
var records = ProcessCars("fuel.csv");

var ns = (XNamespace) "http://pluralsight.com/cars/2016";
var ex = (XNamespace) "http://pluralsight.com/cars/2016/ex";
var document = new XDocument();
var cars = new XElement(ns + "Cars",
    from record in records
    select new XElement(ex + "Car",
                new XAttribute("Name", record.Name),
                new xAttribute("Combined", record.Combined)));

document.Add(cars);
document.Save("fuel.xml");
```

#### Querying
Need to add the namespace to the element
```C#
var ns = (XNamespace) "http://pluralsight.com/cars/2016";
var ex = (XNamespace) "http://pluralsight.com/cars/2016/ex";
var document = XDocument.Load("fuel.xml");

var query =
    from elemen in document.Element(ns + "Cars").Element(ex + "Car")
    where element.Attribute("Manufacturer").Value == "BMW"
    select element.Attribute("Name").Value;

foreach (var name in query)
{
    Console.WriteLine(name);
}
```