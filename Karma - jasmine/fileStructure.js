import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { ComponentClass } from './app.component'


describe('Spec name', () => {

    let component: ComponentClass;
    let fixture: ComponentFixture<ComponentClass>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ComponentClass],
            imports: [],
            providers:[]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ComponentClass);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    afterEach(() => {

    });

    it('Should do something', () => {
        expect('some value').someMethodTest();
    });

})


"describe" defines a test spec, typically contains all tests related to one class
"it" defines an individual test

"beforeEach" runs before each test, does the setup for the test
"afterEach" is used for teardown
"beforeAll" and "afterAll" will run once before and after all tests

"testBed": the main toolbar, similar to NgModule, equipt with similar values (declarations, imports, providers)
    .compileComponent tells angular to compile the declared components
"async": lets all the asynchronous code finish before continuing
"fixture" is a fixed state of a set of objects used as a baseline for running tests. 
    The purpose is to provide a well known and fixed environment for running the tests

detectChanges(): change detection does not happen automatically and have to be called
    the first call will trigger the components lifecycle hook (and run ngOnInit)

example of test methods:
toBeDefined, toBeTruthy, toContain, toEqual, toThrow, toBeNull, toBe()
expect(myValue).toBeGreaterThan(3)
expect(myValue).not.toBeGreaterThan(3)