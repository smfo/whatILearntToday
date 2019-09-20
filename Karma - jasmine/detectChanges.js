

beforeEach(() => {
    fixture = TestBed.createComponent(ComponentClass);
    component = fixture.componentInstance;
    fixture.detectChanges();
});

afterEach(() => {

});

it('Should do something', () => {
    component.inputValue = 'Hello';
    expect(component.inputValue).toEqual('Hello');  //Fails
    fixture.detectChanges();                        //Updates the fixture
    expect(component.inputValue).toEqual('Hello');  //Passes
});


// detectChanges(): change detection does not happen automatically and have to be called
// the first call will trigger the components lifecycle hook (and run ngOnInit), 
// for testing related to this (for example input values needs to be set), do not call in "beforeEach"
