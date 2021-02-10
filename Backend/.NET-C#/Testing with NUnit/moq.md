
# Moq with NUnit
Use mock to create runtime mocks for testing.

```C#
const mockObject = new Mock<variableType>();
```

Can now be used as ```mockObject.Object```.

```C#
const mockContext = new Mock<MyGamesContext>();
const service = new UserService(mockContext.Object);
```

## Mocking methods, properties and return values

Setup is used to specify what method in the mock object can be called and with what input values.
If this method is called with the correct values from the test, the values set in Returns will be called
(other outcomes can also be used, like Throws);

```C#
const mockService = new Mock<UserService>();
mockService.Setup(x => x.AddUser("Synne")).Returns(new User());
```

To generalize more, we do not have to use one specific input. The It object can be used for this and is usefull
if you donæt know which value the test object will have for that parameter or if you are going to run
a lot of tests with different inputs. There are also other options like IsNotNull().

```C#
//UserService
public User AddUser(strin userName)
{...}

const mockService = new Mock<UserService>();
mockService.Setup(x => x.AddUser(It.IsAny<string>())).Returns(new User());
```

The same method can be used for non private properties in the methods.
```C#
public interface ICreditScorer
{
    int Score { get; set; }
}

//Test
var mockCreditScorer = new Mock<ICreditScorer>();
mockCreditScorer.Setup(x => x.Score).Returns(300);
```

**Throw exceptions**
Instead of returning a value, we can set the mock to throw an exception when a certain methos id called.
To do this, use throws instead of returns.
```C#
//UserService
public User AddUser(strin userName)
{...}

const mockService = new Mock<UserService>();
mockService.Setup(x => x.AddUser(It.IsAny<string>())).Throws<ExceptionType>();

//alternativly
mockService.Setup(x => x.AddUser(It.IsAny<string>())).Throws(new Exception("message"));
```

## Mock hierarchy
Some times mocks have properties of other types that we also want to mock.\
nb: All the properties in the hierarchy, under the top level, must be virtual.

```C#
public interface ICreditScorer
    {
        ScoreResult ScoreResult { get; set; }
    }

public class ScoreResult
    {
        public virtual ScoreValue ScoreValue { get; }
    }

public class ScoreValue
    {
        public virtual int Score { get; }
    }

var mockCS = new Mock<ICreditScorer>(); //has a parameter ScoreResult

var mockSR = new Mock<ScoreResult>(); //has a parameter ScoreValue
var mockSV = new Mock<ScoreValue>();

//setting score value
mockSV.Setup(x => x.Score).Returns(300);
//setting score result
mockSR.Setup(x => x.ScoreValue).Returns(mockSV.Object);

//setting ICreditScore
mockCS.Setup(x => x.ScoreResult).Returns(mockSR.Object);
```

There is a shorter way to do this directly in the original mock.
```C#
mockCS.Setup(x => x.ScoreResult.ScoreValue.Score).Returns(300);

//Other ways to set up the hierarchy
var mockCS = new Mock<ICreditScorer>{ DefaultValue = DefaultValue.Mock };
var mockCS = new Mock<ICreditScorer>{ DefaultValue = DefaultValue.Empty };
```

## Track changes, properties
Changes will not be tracked automatically, this has to be added manually.

```C#
mockSC.SetupProperty(x => x.Count, optional initial value);
```

**Multiple properties with change tracking**
Instead of using SetupProperties on all the properties, use SetupAllProperties.\
This will set change tracking for all properties in the mock. However it will also override
other setup options that have been chosen, so be sure to use SetupAllProperties first.

```C#
mockCS.SetupAllProperties();
mockCS.Setup(x => x.ScoreResult.ScoreValue.Score).Returns(300);
```

## Behaviour based testing
Check if mocks and parameters work as expected. Basically use as a mock, not a stub (assert on the mock).

Use Verify to check if a method has been called.
```C#
mockIdentityVerifier.Verify(x => x.Initialize());
```

**Method with parameters**
If the method has parameters, verify with the values that should be sent to the method when the test runs.\
This will verify if the method is called as expected and with the expected parameters.

```C#
public interface ICreditScorer
    {
        void CalculateScore(string applicantName, string applicantAddress);
    }

//Test
mockCS.Verify(x => x.CalculateScore("Sarah", "Some adresse here"));
```

If we don't care about the values use ```It.IsAny<type>()``` as before.

**Times called**
Add a second parameter ```Times....``` to the lambda expression in Verify.

```C#
//Some examples
mockCS.Verify(x => x.CalculateScore("Sarah", "Some adresse here"), Times.Once());
mockCS.Verify(x => x.CalculateScore("Sarah", "Some adresse here"), Times.Exactly(int));
mockCS.Verify(x => x.CalculateScore("Sarah", "Some adresse here"), Times.AtLeast(int));
```

**Setter and getter**
Verify is a parameters setter or getter is accessed.

For verifySet we need to specify which value we expect to get set, or use It.IsAny.\
For verifyGet we can specify how many times we expect the getter to be accessed, this is passed as a second parameter, just like in verify.
```C#
mockCS.VerifyGet(x => x.ScoreResult.ScoreValue.Score, Times.Once());
mockCS.VerifySet(x => x.Count = 1);
```

**Only pass if all properties and methods are verifies**
This essencially mean that if properties or methods that are not verifies is called while excecuting the test, the assert
will fail.

```C#
//The IdentityVerifier calls two methods, Initialize() and Validate()

//Failes
mockIdentityVerfirier.Verify(x => x.Initialize());
mockIdentityVerifier.VerifyNoOtherCalls();

//Passes
mockIdentityVerfirier.Verify(x => x.Initialize());
mockIdentityVerfirier.Verify(x => x.Validate(It.IsAny<string>(), It.IsAny<int>(), It.IsAny<string>()));
mockIdentityVerifier.VerifyNoOtherCalls();
```

## Strict and loose
By default mock objects are loose. These return default values, does not throw exceptions and does not require setup.\
Strict mocks require that all methods and parameters that are used by the test are initialized.\
Which type to use can be defined when initializing the mock.

```C#
var mockIdentityVerifier = new Mock<IIdentityVerifier>(MockBehavior.Strict);

mockIdentityVerifier.Setup(x => x.Initialize());
mockIdentityVerifier.Setup(x => x.Validate(It.IsAny<string>(), It.IsAny<int>(), It.IsAny<string>()));
```

Loose mocks are quicker and easier to set up, whereas strict mocks give the reassuranse that only methods you
mean to call are actually called.

## Partial mocks
Partial mocks are mocks that implement classes as supposed to interfaces. By using classes we can 
make calls to the actual functions defined in the class, and replace some of these if required (functions that
uses db calls, provide randon values etc.).

To return non random values from these functions, mock the class and use setup and return.

Mock class methods cannot be private, they need to be either public or protected and they have to be virtual.\
When the methods are public, mock them like before, by using Setup.\
When the methods are protected we need to use Mock.Protected, and IntelliSense is not available, hence we cannot 
use lambda functions.

```C#
using Mock.Protected;
var mockIdentityVerifier = new Mock<IdentityVerifier>();

mockIdentityVerifier.Protected().Setup<returnType>("MethodName", parameters);

mockIdentityVerifier.Protected().Setup<void>("Initialize");
mockIdentityVerifier.Protected().Setup<bool>("Validate", It.IsAny<string>(), It.IsAny<int>(), It.IsAny<string>());
```