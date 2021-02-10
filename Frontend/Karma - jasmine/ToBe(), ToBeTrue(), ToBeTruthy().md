

## toBe()
A strict compoarison that only passes if the exact same object in memory is returned.

```js
function toBe() {
    return {
      compare: function(actual, expected) {
        return {
          pass: actual === expected
        };
      }
    };
  }

  expect(foo).toBe(true)
```

## toEqual()
not as strict as `toBe()`. This test will pass if the objects compared have the same value, but does not refere to the exact same object in memory.

For primitive types there is not difference between `toBe()` and `toEqual()`

## toBeTruthy()
Checks if the value passed contains a value\
NB: empty arrays will also pass this test

```js
  function toBeTruthy() {
    return {
      compare: function(actual) {
        return {
          pass: !!actual
        };
      }
    };
  }

  expect(foo).toBeTruthy()
```

## toBeTrue()
The difference from `toBe(true)`, is that `toBeTrue()` checks if it is dealing with a Boolean\
This test will pass for foo = true and expect(new Boolean(true)).toBeTrue

```JS
  function toBeTrue(actual) {
    return actual === true ||
      is(actual, 'Boolean') &&
      actual.valueOf();
  }

  expect(foo).toBeTrue()
```

