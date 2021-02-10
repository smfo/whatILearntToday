
//setting a description to xdescription will make Jasmine skip it and their results will not apprea in the run results

xdescribe("A spec", function() {
    var foo;
  
    beforeEach(function() {
      foo = 0;
      foo += 1;
    });
  
    it("is just a function, so it can contain any code", function() {
      expect(foo).toEqual(1);
    });
  
    xit("can be declared 'xit'", function() {
      expect(true).toBe(false);
    });
  
    it("can be declared by calling 'pending' in the spec body", function() {
      expect(true).toBe(false);
      pending();
    });
});

//using xit will mark the test as pending. These will not run, however their result will show up in
//the results as pending/skipped
// This applies to tests marked with xit, test without a function body and test where the function pending()
// is called anywhere in the function body