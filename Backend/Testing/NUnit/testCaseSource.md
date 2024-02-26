# TestCase Scenario

This is a way to write and structure TestCases in NUnit.\
You will write your TestFixture in one class and the TestCaseData in another.

For each test you need to specify the typeof case source you are using, that will be the class where the data is spesified. And the nameof, that will be th ename on the specific method that holds the test data.

```C#
	[TestFixture]
	public class GjennomforingssystemUserIdTests
	{
		[Test,
		 TestCaseSource(typeof(GjennomforingssystemUserIdTestCase),
			 nameof(GjennomforingssystemUserIdTestCase.UgyldigId))]
		public void UGyldigGjennomforingssystemUserIdTest(string input)
		{
			var isValid = GjennomforingssystemUserId.TryParse(input, out GjennomforingssystemUserId id);
			isValid.Should().BeFalse();
		}
    }

	public class GjennomforingssystemUserIdTestCase
	{
		public static IEnumerable UgyldigId
		{
			get
			{
				yield return new TestCaseData("123456789");
				yield return new TestCaseData("Some string here");
				yield return new TestCaseData(null);
			}
		}
	}

```

It is possible to return a value from the test and check it in the TestCaseData as well as in the actual test.

```C#
	[TestFixture]
	public class GjennomforingssystemUserIdTests
	{
		[Test,
		 TestCaseSource(typeof(GjennomforingssystemUserIdTestCase),
			 nameof(GjennomforingssystemUserIdTestCase.GyldigId))]
		public GjennomforingssystemUserId GyldigGjennomforingssystemUserIdTest(string input)
		{
			var isValid = GjennomforingssystemUserId.TryParse(input, out GjennomforingssystemUserId id);
			isValid.Should().BeTrue();

			return id;
		}
    }

	public class GjennomforingssystemUserIdTestCase
	{
		public static IEnumerable GyldigId
		{
			get
			{
				yield return new TestCaseData("17101939561").Returns(GjennomforingssystemUserId.From("17101939561"));
				yield return new TestCaseData("8e42c743-f18a-4d68-8564-3cff1745ecc8").Returns(GjennomforingssystemUserId.From("8e42c743-f18a-4d68-8564-3cff1745ecc8"));
			}
		}
	}

```