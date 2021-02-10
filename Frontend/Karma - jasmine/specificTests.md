# Run specific tests
Compiles and builds all tests, only runs chosen tests

`fdescribe` only runs chosen spec:
```js
fdescribe('Spec1',function () {
    it('should create', function(){});
})
```

`fit` only runs chosen test:
```js
describe('Spec1', function(){
    fit('testA', function(){});

    it('testB', function(){});
});
```