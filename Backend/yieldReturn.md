# Yield return

This is a keyworkd used when returning IEnumerables.

Yield is used to build generators of element sequenses. The generators do not create collections, but stores the current state of the collection and moves to the next state on command. This decreases the memory requirements needed to run the code.

```C#
public void Consumer()
{
    var integers = Integers();
    foreach(int i in integers)
    {
        Console.WriteLine(i.ToString());
    }
}

public IEnumerable<int> Integers()
{
    var listOfReturnValues = new List<int>[1, 2, 3, 4, 5];

    foreach(var value in listOfReturnValues){
        yield return value
    }
}
```

Instead of creating all the elements when calling `Integers()`, each element is created when it is used in the foreach loop in the `Consumer()` method. First we create element `1`, then `2` and so on. Meaning that if we do not need all elements, they will never be created and stored in memory.

## Yield break

This keywords allows you to stop generation and exit it for good. The next element in the sequense will be unavailable, however if the method is called again a new generator will be created, and the generation will start from scratch.

```C#
public static void Main()
	{
		var list = GenerateIntegers(5);
		foreach(var integer in list){
			Console.WriteLine(integer);
		}
		
		foreach(var integer in list){
			Console.WriteLine(integer);
		}
		
	}
	
public static IEnumerable GenerateIntegers(int maxValue)
	{
		for(int j = 1; j <= 10; j++){

      		if (j > maxValue){
		  		Console.WriteLine("break");
        		yield break;
			}

      		yield return j;
    	}
  	}
```

For the first run the generator will break at the value 5, even though the function is supposed to run until 10. When called again, the generator will start from scratch, returning values starting at 1.

## Limitations

Yield return cannot be used:
* in anonymous methods of lambda-expressions
* in methods that contain unsafe code
* inside try-catch blocks