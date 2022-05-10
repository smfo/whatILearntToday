# NSubstitute

A substitute for .NET mocking libraries, designed for Arrange-Act-Assert testing. Instead of chosing betweem mock, fake, stub, spy.. just substitute the type you need.

```C#
//Create a substitute for the required class:
var calculator = Substitute.For<ICalculator>();

//Set a return value for the method Add with parameters 1 and 2:
calculator.Add(1, 2).Returns(3);
Assert.AreEqual(3, calculator.Add(1, 2));

//Check received calls to substitute:
calculator.Received().Add(1, Arg.Any<int>());
calculator.DidNotReceive().Add(2, 2);

//Raise events
calculator.PoweringUp += Raise.Event();
```

Install the NSubstitute NuGet package. And consider installing NSubstitute.Analyzers.CSharp or NSubstitute.Analyzers.VisualBasic.\
Add `using Nsubstitute` and go!

Note: NSubstitute will inly work properly with interfaces or classes that are overridable (virtual, by default classes in C# are non-virtual).