# IAsyncEnumerable

Example without using IAsync
```C#
class Program
{
    static async Task Main(string[] args)
    {
        Console.WriteLine($"{DateTime.Now.ToLongTimeString()}: Start");

        foreach (var item in await FetchItems())
        {
            Console.WriteLine($"{DateTime.Now.ToLongTimeString()}: {item}");
        }

        Console.WriteLine($"{DateTime.Now.ToLongTimeString()}: End");
    }

    static async Task<IEnumerable<int>> FetchItems()
    {
        List<int> Items = new List<int>();
        for (int i = 1; i <= 10; i++)
        {
            await Task.Delay(1000);
            Items.Add(i);
        }

        return Items;
    }

}
```

In the example, all data points are fetched seperatly. Because we use IEnumerable and await, once the application starts we wait for all datapoints to be retrived before they are available to be used futher. In this case, before the Console.Writeline in the foreach loop is run.

## Using Yield
