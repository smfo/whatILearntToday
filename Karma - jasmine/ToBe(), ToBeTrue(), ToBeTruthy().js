

// toBe()
function toBe() {
    return {
      compare: function(actual, expected) {
        return {
          pass: actual === expected
        };
      }
    };
  }

  //only passes if the actual value has the value of the expected value
  expect(foo).toBe(true)
  //foo = true, will pass this test


  //toBeTruthy()
  function toBeTruthy() {
    return {
      compare: function(actual) {
        return {
          pass: !!actual
        };
      }
    };
  }

  //checks if the actual value contains a value
  //NB: empty arrays will also pass this test!


  //toBeTrue()
  function toBeTrue(actual) {
    return actual === true ||
      is(actual, 'Boolean') &&
      actual.valueOf();
  }

  //the difference from toBe(true), is that toBeTrue() checks if it is dealing with a Boolean
  //This test will pass for foo = true and expect(new Boolean(true)).toBeTrue whereas toBe(true) will not
  // beause new Boolean(true) === true => false