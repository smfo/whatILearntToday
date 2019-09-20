
//is is pissible to create nested describe blocks
//when executing beforeEach Jasmin walks through the tree
//executing these in order. The reverse is true for afterEach

describe("A spec", function() {
    var foo;
  
    beforeEach(function() {
      foo = 0;
      foo += 1;
    });
  
    afterEach(function() {
      foo = 0;
    });
  
    it("is just a function, so it can contain any code", function() {
      expect(foo).toEqual(1);
    });
  
    it("can have more than one expectation", function() {
      expect(foo).toEqual(1);
      expect(true).toEqual(true);
    });
  
    //nested
    describe("nested inside a second describe", function() {
      var bar;
  
      beforeEach(function() {
        bar = 1;
      });
  
      it("can reference both scopes as needed", function() {
        expect(foo).toEqual(bar);
      });
    });
    //nested

  });