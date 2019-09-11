//// Specific tests
// 'fdescribe' only runs chosen spec:
fdescribe('Spec1',function () {
    it('should create', function(){});
})

// 'fit' only runs chosen test:
describe('Spec1', function(){
    fit('testA', function(){});

    it('testB', function(){});
})