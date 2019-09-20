//A matcher takes an actual value and an excpected value
//The factory is ideally passed to Jasmine in the beforeEach

//The factory should return an object with a compare function. This will be called to check the expectation

//Matcher implementation
//This matcher checkes if the "actual" value is equal to "gawrsh" + a possible "expected" value (the toBeGoofy input)

var customMatchers = {
  toBeGoofy: function(util, customEqualityTesters) {
    return {
      compare: function(actual, expected) {
        if (expected === undefined) {
          expected = "";
        }

        var result = {};
        result.pass = util.equals(
          actual.hyuk,
          "gawrsh" + expected,
          customEqualityTesters             //customEqualityTesters needs to be passed when using .equals
        );

        //if results has a message, this will be used for a failed expectation
        if (result.pass) {
          result.message = "Expected " + actual + " not to be quite so goofy";
        } else {
          result.message =
            "Expected " + actual + " to be goofy, but it was not very goofy";
        }
        return result;                  //returns true or false
      }
    };
  }
};


//Matcher being used
describe("Custom matcher: 'toBeGoofy'", function() {
    
      beforeEach(function() {
        jasmine.addMatchers(customMatchers);            //Register the matcher with Jasmin
      });
    
      it("is available on an expectation", function() {
        expect({
          hyuk: 'gawrsh'
        }).toBeGoofy();
      });
    
      it("can take an 'expected' parameter", function() {
        expect({
          hyuk: 'gawrsh is fun'
        }).toBeGoofy(' is fun');            //" is fun" will be the expected value in toBeGoofy
      });
    
      it("can be negated", function() {
        expect({
          hyuk: 'this is fun'
        }).not.toBeGoofy();
      });
});

//By default .not.customMatcher will return !result of the compare key
//however, it is also possible to implement a negativeCompare key