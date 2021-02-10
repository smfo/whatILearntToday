
# Testing a class that uses a service

Want to create a mocked version of the service for testing, instead of using the real thing. The mocked service can be created in the test file or be imported as a seperate file

```js
let fakeUserService = {                         
    currentUser: new BehaviorSubject(null),     //mocked value
    setCurrentRole: (id: string) => {           //mocked method
        return of(null)
    }
}

beforeEach(async(() => {
    TestBed.conficureTestionModule({
        declarations: [ComponentClass],
            imports: [],
            providers:[
                {
                    provide: UserService,
                    //use this whenever UserService is required
                    useValue: fakeUserService   
                }
            ]
        }).compileComponents();
}))
```

# Testing a service
**Angular**: The file name must be on this format `service-name.service.spec.ts`. If you use the normal format with `.component.spec.ts` the test will fail because it is looking for a name `component`.

Instanciate the service in beforeEach so each test has a fresh instance of the service.

```js
describe('DateIntervalDefinitionService', () => {
    let service: DateIntervalDefinitionService;

    beforeEach(() => { service = new DateIntervalDefinitionService() });

    it('should create', () => {
        expect(service).toBeTruthy();
    });

    it('should get updated interval "December 24 2020 - December 24 2021"', () => {
        const fromDate = new Date("2020-12-24");
        const toDate = new Date("2021-12-24");
        const expectedDateInterval = [fromDate, toDate];
        let dateInterval;

        service.selectedInterval().subscribe(val => {
            dateInterval = val;
        });

        service.changeFromDate(fromDate);
        service.changeToDate(toDate);

        expect(dateInterval).toEqual(expectedDateInterval);
    })
});
```