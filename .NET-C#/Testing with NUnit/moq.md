
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

## Mocking methods and return values

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