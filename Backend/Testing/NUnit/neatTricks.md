# Small tips and tricks

## Attributes

**TestCase**
Used to run the same test multiple times with some variables that vary. The variables can be listed
in the parentesies.

Alternativly use [testCaseScenarios](./testCaseSource.md)

```C#
[TestCase("Test user", false)]
[TestCase(null, true)]
public void UserDoesNotExistGet(string userName, bool assertValue){

}
```

**Ignore**
Ignore the test on run all, with an optional message.

```C#
[Ignore("This code is not yet implemented")]
```

**Category**
Sort the tests in multiple categories and only run test belonging to one category. In visual studio, sort
by traits.

```C#
[Category("Test category")]
```
