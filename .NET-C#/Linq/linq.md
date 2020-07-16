
# LINQ
LINQ (Language integrated query) provides a single query interface for different types of data sources and eliminates
the mismatch between programming languages and databases. It is built in C# or VBArray.NET

## Linq and C#
IEnumberable<T> is king!

### Extension method
Creates a static public method of any type.\
The first parameter will always use a "this" modifier, other parameters are treated normally.

ToDouble will appear as if it is an instance method of the string type.
```C#
public static class StringExtensions
{
    static public double ToDouble (this string data)
    {
        double result = double.Parse(data);
        return result;
    }
}

//using the method
string text = "43.35";
double data = text.ToDouble();
```

All Linq operators, filter and aggregation methods are defined as extension methods.\
All these live in `System.Linq`.

### Func type
Many Linq operators use this type. Introduced as an easy way to work with delegates, types what allow printing of variables that point to methods. There are 17 overloads of Func.\
The last generic parameter always describes the return type of the method. The others are incomming types.

```C#
Func<int, int> square = x => x * x;
square(3);

Func<int, int, int> add = (x, y) => x + y;
add(8, 19);
```

### Action type
Always return void.

```C#
Action<int> write = x => Console.WriteLine(x);
```

### Implicit typing
