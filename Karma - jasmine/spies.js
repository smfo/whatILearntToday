
//// createSpy() and createSpyObject()

//What is a spy?
// A spy can stub any function and tracks calls to this and all its arguments

// Stub: a pice of code used to stang in for some programming functionality.
// May be used to simulate behavior of existing code or temporary substitute for yet-to-be-developed code

spyOn(existing Object, method name);

// spyOn(foo, "getBar").and.callThrough() tracks the function, but the original function implementation is still used
// spyOn(foo, "getBar").and.returnValue(123) returns the value 123 stead og the function return value

// and.callFake returns a fake function, not just a vet value liike returnValue

spyOn(foo, "getBar").and.callFake(function(arguments, can, be, received) {
    return 1001;
  });

//spyOn(foo, "setBar").and.throwError(error value) throws an eror with the set value

//All calls to a spy is tracked and can be viwed with calls

describe("A spy", function() {
    var foo, bar = null;
  
    beforeEach(function() {
      foo = {
        setBar: function(value) {
          bar = value;
        }
      };
  
      spyOn(foo, 'setBar');
    });
  
    //.calls.any() has the spy been called
    it("tracks if it was called at all", function() {
      expect(foo.setBar.calls.any()).toEqual(false);
      foo.setBar();
      expect(foo.setBar.calls.any()).toEqual(true);
    });
  
    //.calls.count()
    it("tracks the number of times it was called", function() {
      expect(foo.setBar.calls.count()).toEqual(0);
      foo.setBar();
      foo.setBar();
      expect(foo.setBar.calls.count()).toEqual(2);
    });

    //.calls.argsFor(call index)
    it("tracks the arguments of each call", function() {
      foo.setBar(123);
      foo.setBar(456, "baz");
      expect(foo.setBar.calls.argsFor(0)).toEqual([123]);
      expect(foo.setBar.calls.argsFor(1)).toEqual([456, "baz"]);
    });
  
    //.calls.allArgs()
    it("tracks the arguments of all calls", function() {
      foo.setBar(123);
      foo.setBar(456, "baz");
      expect(foo.setBar.calls.allArgs()).toEqual([[123],[456, "baz"]]);
    });
  
    //.calls.all()
    it("can provide the context and arguments to all calls", function() {
      foo.setBar(123);
      expect(foo.setBar.calls.all()).toEqual([{object: foo, args: [123]}]);
    });
  
    //.calls.mostRecent()
    it("has a shortcut to the most recent call", function() {
      foo.setBar(123);
      foo.setBar(456, "baz");
      expect(foo.setBar.calls.mostRecent()).toEqual({object: foo, args: [456, "baz"]});
    });
  
    //.calls.first()
    it("has a shortcut to the first call", function() {
      foo.setBar(123);
      foo.setBar(456, "baz");
      expect(foo.setBar.calls.first()).toEqual({object: foo, args: [123]});
    });
  
    //object, can be sat on first(), mostRecent() and all(). contains the value of "this" when the call was made
    it("tracks the context", function() {
      var spy = jasmine.createSpy('spy');
      var baz = {
        fn: spy
      };
      var quux = {
        fn: spy
      };
      baz.fn(123);
      quux.fn(456);
  
      expect(spy.calls.first().object).toBe(baz);
      expect(spy.calls.mostRecent().object).toBe(quux);
    });

    //.calls.reset()
    it("can be reset", function() {
      foo.setBar(123);
      foo.setBar(456, "baz");
      expect(foo.setBar.calls.any()).toBe(true);
      foo.setBar.calls.reset();
      expect(foo.setBar.calls.any()).toBe(false);
    });
  });

//   jasmine.createSpy() is used to create a bare spy when there is no function to spy on
//createSpy(function name)
describe("A spy, when created manually", function() {
    var whatAmI;
  
    beforeEach(function() {
      whatAmI = jasmine.createSpy('whatAmI');
      whatAmI("I", "am", "a", "spy");
    });
  
    it("is named, which helps in error reporting", function() {
      expect(whatAmI.and.identity()).toEqual('whatAmI');
    });
  
    it("tracks that the spy was called", function() {
      expect(whatAmI).toHaveBeenCalled();
    });
  
    it("tracks its number of calls", function() {
      expect(whatAmI.calls.count()).toEqual(1);
    });
  
    it("tracks all the arguments of its calls", function() {
      expect(whatAmI).toHaveBeenCalledWith("I", "am", "a", "spy");
    });
  
    it("allows access to the most recent call", function() {
      expect(whatAmI.calls.mostRecent().args[0]).toEqual("I");
    });
  });

  // jasmine.createSpyObj() is used do pass multiple strings as spies
  //the method returns an object with a property for each string that is a spy
  //createSpyObj(object name, [object properties])

  describe("Multiple spies, when created manually", function() {
    var tape;
  
    beforeEach(function() {
      tape = jasmine.createSpyObj('tape', ['play', 'pause', 'stop', 'rewind']);
      tape.play();
      tape.pause();
      tape.rewind(0);
    });
  
    it("creates spies for each requested function", function() {
      expect(tape.play).toBeDefined();
      expect(tape.pause).toBeDefined();
      expect(tape.stop).toBeDefined();
      expect(tape.rewind).toBeDefined();
    });
  
    it("tracks that the spies were called", function() {
      expect(tape.play).toHaveBeenCalled();
      expect(tape.pause).toHaveBeenCalled();
      expect(tape.rewind).toHaveBeenCalled();
      expect(tape.stop).not.toHaveBeenCalled();
    });
  
    it("tracks all the arguments of its calls", function() {
      expect(tape.rewind).toHaveBeenCalledWith(0);
    });
  });