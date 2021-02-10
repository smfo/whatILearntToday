
# Error handeling

NB: do not throw errors when a normal logical check should have caught the mistake.

## NUnit
```C#
Assert.That(() => expression to test, Throws.TypeOf<type of exception>());

Assert.That(() => expression to test, Throws.TypeOf<type of exception>().With.Property(property name).EqualTo(expression));

Assert.Throws<type of exception>(() => expression to test);

```