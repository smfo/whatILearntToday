# Tips and tricks for XUnit

`Fact` tests have no parameters, whereas `Theory` expect some input data to run the test.

```C#
    [Theory]
	[InlineData("anonymous", true)]
	[InlineData("123_anonymous", false)]
	public void IsAnonymous_WithInnerValue_IsTrueWhenStartingWithAnonymous(string value, bool expectedResult) => 
		new UserId(value).IsAnonymous.Should().Be(expectedResult);

	[Fact]
	public void JsonConversion_WithInnerValue_BehavesAsString()
	{
		var value = "*this is the user id*";
		var id = new UserId(value);

		var json = JsonSerializer.SerializeToNode(id);

		var deserialized = json.Deserialize<UserId>();

		deserialized.Should().Be(id);
		json!.ToString().Should().Be(value);
	}
```