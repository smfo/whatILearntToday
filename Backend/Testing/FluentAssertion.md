# Fluent assertion

A readable way to assert tests that can be combined with things like XUnit.

In my oppinion fluent assertion gives much better feedback in the test explorer when a test fails than Assert and it is more readable.

```C#
Assert.AreEqual(expected.NP.GjennomforingsStart, result.NP.GjennomforingsStart);
Assert.AreEqual(expected.NP.GjennomforingsStopp, result.NP.GjennomforingsStopp);

result.NP.GjennomforingsStart.Should().Be(expected.NP.GjennomforingsStart);
result.NP.GjennomforingsStopp.Should().Be(expected.NP.GjennomforingsStopp);
```

## Objects

Objects cannot be directly compared as they will have the same value, but the expected and the target object will not be the same instance. For this we use `BeEquivalentTo()` instead.

```C#
result.KP.Should().BeEquivalentTo(expected.KP);
result.NP.Should().BeEquivalentTo(expected.NP);
```