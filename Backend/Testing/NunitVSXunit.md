# C testing frameworks

There are multiple test frameworks for dotnet, most known are NUnit, XUnit and mstest.

XUnit and NUnit have slightly different syntax, but both can use testcases.

## NUnit

Has been around for a long time. This is probably the most used framework, with a lot of older codebases using it.

NUnit is more complex than XUnit and allows for more customization and specific tests. 

### Running tests
A thing many consider a con is that by default NUnit does not create new instances of objects created in setup for each test. Meaning the tests arent properly isolated.

NUnit creates a new instance of the current test class and runs all of the test methods from the same instance.

```C#

	[TestFixture]
	public class GjennomforingssystemUserIdTests
	{

		[TestCase("17101939561")]
		[TestCase("8e42c743-f18a-4d68-8564-3cff1745ecc8")]
		public void TryParse_ValidInputString_ReturnsTrue(string input)
		{
			var isValid = GjennomforingssystemUserId.TryParse(input, out GjennomforingssystemUserId id);
			isValid.Should().BeTrue();
			id.Value.Should().Be(input);
		}

		[TestCase("123456789")]
		[TestCase("Some string here")]
		[TestCase(null)]
		[TestCase("")]
		public void TryParse_InvalidInputString_ReturnsFalse(string input)
		{
			var isValid = GjennomforingssystemUserId.TryParse(input, out GjennomforingssystemUserId id);
			isValid.Should().BeFalse();
			id.Value.Should().Be(null);
		}
    }
```

## XUnit

XUnit builds on NUnit, with some changes. Most new project use this.\
XUnit uses a more TDD based philosofy, and though it is newer than NUnit it it well documented and has a growing community.

### Running tests
The bigges pro for people using XUnit is that the test by default use isolated instances of objects set up before each test is ran.

XUNit createa a new instance of the test class for each of the test methods. Therefore you cannot use fields or properties to share data between tests, this would lead to the test methods depending on one another, and is bad practice.

```C#
public class BValueParserTests
{
	[Theory]
	[InlineData("2.34", 2.34)]
	[InlineData("2.34 ", 2.34)]
	[InlineData("2,34", 2.34)]
	[InlineData("-2.34", -2.34)]
	[InlineData("-2,34", -2.34)]
	[InlineData("-2", -2)]
	[InlineData("2", 2)]
	public void ParseBValue_WithString_ReturnsExpectedValue(string input, double expected)
	{
		var target = new BVerdiParser();
		target.Parse(input).Should().Be(expected);
	}

	[Theory]
	[InlineData(null)]
	[InlineData("Dette er jo ikke et tall")]
	[InlineData("10")]
	[InlineData("-10")]
	[InlineData("500")]
	[InlineData("1 43")]
	public void ParseBValue_WithInvalidString_Throws(string input)
	{
		var target = new BVerdiParser();
		var action = () => target.Parse(input);
		action.Should().Throw<ArgumentException>();
	}
}
```