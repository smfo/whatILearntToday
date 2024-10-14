# Fluent assertion

A third-party lirary that provides a readable way to assert tests. It can be combined with test frameworks like XUnit or NUnit.

In my oppinion fluent assertion gives much better feedback in the test explorer when a test fails than Assert and it is more readable.

```C#
// NUnit
Assert.AreEqual(expected.NP.GjennomforingsStart, result.NP.GjennomforingsStart);
Assert.AreEqual(expected.NP.GjennomforingsStopp, result.NP.GjennomforingsStopp);

// FluentAssertion
result.NP.GjennomforingsStart.Should().Be(expected.NP.GjennomforingsStart);
result.NP.GjennomforingsStopp.Should().Be(expected.NP.GjennomforingsStopp);
```

Checks on the same object can also be nested
```C#
result.NP.GjennomforingsStart.Should()
    .Be(expected.NP.GjennomforingsStart).
    And.BeOfType<DateTime>();
```

## Objects

Objects cannot be directly compared as they will have the same value, but the expected and the target object will not be the same instance. For this we use `BeEquivalentTo()` instead.

```C#
result.KP.Should().BeEquivalentTo(expected.KP);
result.NP.Should().BeEquivalentTo(expected.NP);
```

## AssertionScope - run all checks

If you have multiple checks in one method and the first fails, you will get an error and the other checks will never run. The test explorer will display that first error you got.\
If you use an AssertionScope however, all the checks will complete regardless and if more than one fails you will be able to see all the errors and the relevant information after one run.

```C#
public void UgyldigIdNummerTest(string input)
		{
			var ex = Assert.Throws<ValidationException>(() => IdNummer.Create(input));

			using (new AssertionScope())
			{
				ex.Should().BeOfType<ValidationException>();
				ex.Message.Should()
					.Be("Id-nummeret er ikke et gyldig fødselsnummer, DUF-nummer, D-nummer eller fiktivt fødselsnummer.");
			}
		}
```

## Exceptions

To catch and check exeptions save the function that throws as a variable and use `throw`. Or `NotThrow` for the opposit.

```C#
public void UgyldigIdNummerTest(string input)
		{
			var idNummer = () => IdNummer.Create(input);

			idNummer.Should().Throw<ValidationException>().WithMessage(
				"Id-nummeret er ikke et gyldig fødselsnummer, DUF-nummer, D-nummer eller fiktivt fødselsnummer.");

			//idNummer.Should().NotThrow().Subject.Value.Should().Be(input);
		}
```