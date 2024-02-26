# Implicit and explicit operators

## Implicit

This operator makes it so that the value you convert from will always be accepted as the output. 

In this example, the implicit operator means that an UserId will always be accepted as a string in the code. This happens automatically and isn't something the programmen needs to pay attention to.\
This should only be done in cases where there is not possible to loose any information by converting from the input to the output type.

```C#
public static implicit operator string (UserId id) => id.toString;

public static implicit operator string(GjennomforingssystemProveId gjennomforingssystemProveId)
	{
		return gjennomforingssystemProveId.Value;
	}
```

By using implicit types, you don't have to use `.value` in the code. You can also imput an UserId without any future action when calling functions. This may lead to the use of the wrong constructor and function call if you don't pay attention!

## Explicit

This operator makes it possible to cast a value from the input type to the output type. Mark that this does not happen automatically like with implicit operators. The developer has to make a consious choice and decide that this conversion makes sense in the given scenario.

```C#
// Where From(String id) calls the constructor and creates a new UserId object
public static explicit operator UserId (string id) => From(id)

public static explicit operator GjennomforingssystemProveId(string i)
	{
		return From(i);
	}
```